import { polygonContains, VoronoiPolygon } from 'd3';
import _ from 'lodash';
import { Socket } from 'socket.io';
import Que from 'tinyqueue';
import { isNullOrUndefined } from 'util';
import sortedinfo from '../../sorting.json';
import Community from './Community';
import Road from './Road';
import Settlement, { Memory, OptionTraits } from './settlement';
import Conversation from './settlementAspects/Conversation';
import VoronoiCell from './VoronoiCell';
import VoronoiController from './VoronoiController';
export enum Cultures {
    ORG = 'Orange',
    GRN = 'Green',
    PPL = 'Purple'
}
// This is the system controller
interface IncomingSettlement extends Array<number> {
    [cat: number]: number;
}
interface DrawObj {
    conversations: any;
    roads?: any;
    settlements?: any;
    realms?: any;
}
enum SettlementCatEnum {
    hobbies,
    personality,
    passion,
    traits,
    skills,
    entertainment
}

export default class SystemController {
    get age() {
        return this.__age;
    }
    get dists() {
        return this.__distances;
    }
    public controller: SocketIO.Socket | null = null;
    public visualiser: SocketIO.Socket | null = null;
    public vor: VoronoiController;
    public settlements: Settlement[];
    public conversations: Conversation[];
    public roads: Road[] = [];
    public time: number = 0;
    public day: number = 0;
    public fameList: { [id: string]: number } = {};
    public _dirtyRoads: boolean = true;
    private _dirtyRealms: boolean = true;
    private _dirtySettlements: boolean = true;
    private _hasVis = false;
    private __distances: Array<{
        dist: number;
        settlement: Settlement
    }>;
    private __age: number;
    private __running: boolean;

    constructor() {
        this.__age = 0;
        this.__running = true;
        this.__tick();
        this.vor = new VoronoiController( 1200, 800 );
        this.settlements = [];
        this.__distances = [];
        this.conversations = [];
        this.settlements.push(
            new Settlement(
                this.vor.cells.find( g => {
                    return polygonContains(
                        g.pgon as VoronoiPolygon<VoronoiCell>,
                        [ 600, 400 ]
                    );
                } ) || this.vor.cells[0],
                '000',
                this,
                Cultures.GRN,
                {
                    perf: 0.9,
                    extro: 0.5,
                    conv: 0.1,
                    fame: 0.6,
                    nrg: 1,
                    res: 100,
                    form: 0.8,
                    disco: 0.5
                }
            )
        );
        this.updateRealms();
    }
    public pause = () => {
        this.__running = false;
    };
    public play = () => {
        this.__running = true;
        this.__tick();
    };
    public updateRealms = () => {
        const cost = ( cell: VoronoiCell ) => {
            switch ( cell.type ) {
                case 0:
                    return 1;
                case 1:
                    return 0.2;
                case 2:
                    return 5;
                default:
                    return 1;
            }
        };
        this.settlements.map( s => {
            type pc = [VoronoiCell, number];
            const frontier = new Que( [], ( a: pc, b: pc ) => a[1] - b[1] );
            frontier.push( [ s.cell, 0 ] );
            interface HArr {
                [cell: number]: number;
            }
            const costSoFar: HArr = {};
            costSoFar[s.cell.i] = 0;
            const done: VoronoiCell[] = [];

            while ( frontier.length ) {
                const thisCell: VoronoiCell = frontier.pop()[0];
                if (
                    _.includes( done, thisCell ) &&
                    costSoFar[thisCell.i] >= thisCell.minDistToSettlement
                ) {
                    continue;
                }
                if (
                    thisCell.type !== 2 &&
                    costSoFar[thisCell.i] < thisCell.minDistToSettlement
                ) {
                    thisCell.minDistToSettlement = costSoFar[thisCell.i];
                    thisCell.closestSettlement = s;
                    thisCell.leadCommunity = s.community;
                }

                thisCell.neighbours.map( next => {
                    const thisDist = costSoFar[thisCell.i] + cost( next );
                    if ( isNullOrUndefined( costSoFar[next.i] ) ) {
                        costSoFar[next.i] = 1000;
                    }
                    costSoFar[next.i] = _.min( [
                        thisDist,
                        costSoFar[next.i]
                    ] ) as number;
                    frontier.push( [ next, thisDist ] );
                } );
                done.push( thisCell );
            }
        } );
        this.__updateDist();
    };
    public attachController( socket: Socket ) {
        this.controller = socket;
        socket.on( 'new_set',( setObj ) => {
            const retVal = this.addSettlement( setObj )
            socket.emit( 'hash', retVal );
        } )
    }
    public attachVisualiser( socket: Socket ) {
        this.visualiser = socket;
        this._hasVis = true;
        this._dirtyRealms = true;
        this._dirtyRoads = true;
        this._dirtySettlements = true;
    }
    public calculateFame() {
        const frecensy = ( memories: Memory[] ) => {
            const decayRate = Math.LN2 / 800;
            return _.sum(
                memories.map(
                    mem => Math.E ** ( -decayRate * ( this.__age - mem.time ) )
                )
            );
        };
        for ( const member in this.fameList ) delete this.fameList[member];
        this.settlements.map( st => {
            this.fameList[st.id] = frecensy( st.memories );
        } );
    }
    public createConversation(
        source: Settlement,
        dest: Settlement,
        type: Cultures
    ) {
        this.conversations.push( new Conversation( type, source, dest, this ) );
    }
    public addSettlement( opts: IncomingSettlement ) {
        // sort options
        const options: any = {
            perf: 0.5,
            extro: 0.5,
            conv: 0.5,
            fame: 0.5,
            nrg: 5,
            res: 3,
            form: 0.5,
            disco: 0.5
        };
        // tslint:disable-next-line:forin
        for ( const trait in options ) {
            opts.map( ( cat, i ) => {
                const catInfo = sortedinfo[SettlementCatEnum[i]];
                options[trait] += catInfo[cat].traits[trait];
            } );
            const t = options[trait];
            if ( trait !== 'nrg' || 'res' ) {
                options[trait] =
                    t > 0.9
                        ? 0.9 + ( t - 0.9 ) / 5
                        : t < 0.1
                            ? 0.1 - ( t + 1 ) / 10
                            : t;
            }
        }
        let foundHash = false;
        let hash = '05';
        while ( !foundHash ) {
            hash = _.random( 1, 250, false ).toString( 16 );
            foundHash = !_.includes( this.settlements.map( c => c.id ), hash );
        }
        const thisSet = new Settlement(
            this.vor.getFarCell(),
            hash,
            this,
            Cultures[_.random( 2 )] as Cultures,
            options as OptionTraits
        );
        this.settlements.push( thisSet );
        this._dirtySettlements = true;
        return hash;
    }

    public __updateDist() {
        this.settlements.map( s => {
            this.settlements.map( f => {
                if ( s === f ) return;
                this.__distances[this.settlements.indexOf( s )] = {
                    dist: this.vor.returnLength( s.cell, f.cell ),
                    settlement: f
                };
            } );
        } );
        this._dirtyRealms = true;
    }

    public draw() {
        const dObj: DrawObj = {
            conversations: this.conversations.map( c => {
                return { x: c.position[0], y: c.position[1], c: c.type };
            } )
        };
        if ( this._dirtyRoads ) {
            dObj.roads = this.roads.map( r => ( {
                path: r.path(),
                state: r.use
            } ) );
            this._dirtyRoads = false;
        }
        if ( this._dirtySettlements ) {
            dObj.settlements = this.settlements.map( s => {
                return {
                    x: s.cell.x,
                    y: s.cell.y,
                    id: s.id,
                    colour: s.community
                }
            } );
            this._dirtySettlements = false;
        }
        if ( this._dirtyRealms ) {
            dObj.realms = this.vor.cells.map( c => {
                return {
                    pgon: c.pgon as VoronoiPolygon<VoronoiCell>,
                    colour: c.leadCommunity
                }
            } );
            this._dirtyRealms = false;
        }
        return dObj;
    }

    private __tick() {
        if ( this.__running ) setTimeout( this.__tick, 84 );
        // console.log( `Ping! it's ${this.__age}` );
        if ( this.time === 239 ) {
            this.__newDay();
        }
        this.__age++;

        this.time++;
        this.time = this.time % 240;
        this.conversations.map( c => c.update() );
        this.settlements.map( s => s.update() );
        _.sampleSize( this.roads, _.min( [ this.roads.length, 30 ] ) ).map( r =>
            r.update()
        );
        if ( this._hasVis ) {
            const s = this.visualiser as SocketIO.Socket;
            s.emit( 'draw', this.draw() );
        }
    }
    private __newDay() {
        this.settlements.map( s => s.refresh() );
    }
}
