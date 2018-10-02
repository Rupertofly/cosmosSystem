import _ from 'lodash';
import Que from 'tinyqueue';
import { isNullOrUndefined } from 'util';
import sortedinfo from '../../sorting.json';
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
    [cat: number]:number;
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
    public vor: VoronoiController;
    public settlements: Settlement[];
    public conversations: Conversation[];
    public roads: Road[] = [];
    public time: number = 0;
    public day: number = 0;
    public fameList: { [id: string]: number } = {};
    private __distances: Array<{ dist: number; settlement: Settlement }>;
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
    public calculateFame() {
        const frecensy = ( memories: Memory[] ) => {
            const decayRate = Math.LN2 / 800;
            return _.sum(
                memories.map(
                    mem => Math.E ** ( -decayRate * ( this.time - mem.time ) )
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
            opts.map( ( cat,i ) => {
                const catInfo = sortedinfo[SettlementCatEnum[i]];
                options[trait] += catInfo[cat].traits[trait]
            } );
            const t = options[trait]
            if ( trait !== 'nrg' || 'res' ) {
                options[trait] = t > 0.9 ? 0.9 + ( t - 0.9 ) / 5 : t < 0.1 ? 0.1 - ( t + 1 ) / 10 : t;
            }
        }
        let foundHash = false;
        let hash = '05';
        while ( !foundHash ) {
            hash = _.random( 1, 250, false ).toString( 16 );
            foundHash = !_.includes( this.settlements.map( c => c.id ),hash )
        }
        this.settlements.push( new Settlement( this.vor.getFarCell(),hash,this,Cultures[_.random( 2 )]as Cultures,options as OptionTraits ) )
    }

    private __updateDist() {
        this.settlements.map( s => {
            this.settlements.map( f => {
                if ( s === f ) return;
                this.__distances[this.settlements.indexOf( s )] = {
                    dist: this.vor.returnLength( s.cell, f.cell ),
                    settlement: f
                };
            } );
        } );
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
    }
    private __newDay() {}
}
