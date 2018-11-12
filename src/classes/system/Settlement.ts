import _ from 'lodash';
import Culture from './Culture'
import Road from './Road';
import Conversation from './settlementAspects/Conversation';
import SystemController from './SystemController';
import VoronoiCell from './VoronoiCell';
enum doIt {
    DO,
    DONT,
    MEH
}

declare interface Community {}

/**
 * A set of particular trais
 *
 * @interface OptionTraits
 */
export interface OptionTraits {
    /** Performativity: ratio of exhibition to conversation */
    perf: number;
    /** Extroverion: converse with close or with far */
    extro: number;
    /** Convincing: strength of actors */
    conv: number;
    /** Fame-hungry: talks to popular settlements */
    fame: number;
    /** Energy: how many spoons one has */
    nrg: number;
    /** Resilance: amount of a beating settlement can take */
    res: number;
    /** Conformaty: how much a settlement wants to support the status quo */
    form: number;
    /** Discursiveness: how willing a settlement is to engage those that are different to it */
    disco: number;
}
export class Memory {
    constructor(
        public settlement: Settlement,
        public type: Culture,
        public time: number
    ) {}
}
export default class Settlement {
    public strength = 3;
    public memories: Memory[] = [];
    public roads: Road[];
    private spoons = 5;
    private timeSinceSpoon = 0;
    private history: Memory[] = [];
    constructor(
        public cell: VoronoiCell,
        public id: string,
        public system: SystemController,
        public community: Culture
        ,
        public options: OptionTraits
    ) {
        this.strength = options.res;
        this.spoons = _.floor( ( 1 - system.time / 240 ) * options.nrg );
        system.fameList[this.id] = 30;
        this.roads = [];
        this.system.settlements.map( st => {
            if ( st === this ) return;
            this.roads.push( new Road( st, this, this.system ) );
        } )
        this.system._dirtyRoads = true;
    }
    public update() {
        if ( !this.spoons )return;
        if ( ( this.timeSinceSpoon > 60 )||( this.timeSinceSpoon > 5 && _.random( 1,false ) ) ) {
            this.useSpoon();
            this.timeSinceSpoon = 0;
            return;
        }
        this.timeSinceSpoon++;
    }

    public refresh() {
        if ( this.spoons < 1 ) {
        this.spoons = this.options.nrg;
        }
    }
    public receiveConversation( conv: Conversation ) {
        this.memories.push(
            new Memory( conv.source, conv.type, this.system.age )
        );
        _.remove( this.system.conversations, c => c === conv );
    }
    private getFame() {
        return this.system.fameList[this.id];
    }
    private useSpoon() {
        /* this.spoons--;
        // chance for repair
        if ( this.strength < this.options.res && Math.random() < 0.8 ) {
            this.strength++;
            return;
        }
        // Act or present
        if ( Math.random() < 0.2 ) {
            this.generateActor();
            return;
        }
        // conversation of exhibition
        if ( Math.random() < this.options.perf ) {
            this.sendConversation();
            return;
        }
        this.createExhibition(); */
        this.spoons--;
        if ( this.system.conversations.length > 10 ) return;
        this.sendConversation();
    }
    private sendConversation() {
        const hotOrNot = _.mean( _.values( this.system.fameList ) );
        let doHot =
            Math.random() < this.options.fame
                ? doIt.DO
                : Math.random() > this.options.fame
                    ? doIt.DONT
                    : doIt.MEH;

        const nearOrFar = _.mean( this.roads.map( r => r.length ) );
        let doFar =
            Math.random() < this.options.extro - 0.05
                ? doIt.DO
                : Math.random() > this.options.extro + 0.05
                    ? doIt.DONT
                    : doIt.MEH;

        let doDiff =
            Math.random() < this.options.disco
                ? doIt.DO
                : Math.random() > this.options.extro
                    ? doIt.DONT
                    : doIt.MEH;
        const Candidates = () => {
            return this.system.settlements.filter( option => {
                switch ( doHot ) {
                    case 0:
                        if ( option.getFame() < hotOrNot ) return false;
                        break;
                    case 1:
                        if ( option.getFame() > hotOrNot ) return false;
                        break;
                    default:
                        break;
                }
                switch ( doFar ) {
                    case 0:
                        if (
                            this.system.vor.returnLength(
                                this.cell,
                                option.cell
                            ) < hotOrNot
                        ) {
                            return false;
                        }
                        break;
                    case 1:
                        if (
                            this.system.vor.returnLength(
                                this.cell,
                                option.cell
                            ) > hotOrNot
                        ) {
                            return false;
                        }
                        break;
                    default:
                        break;
                }
                switch ( doDiff ) {
                    case 0:
                        if ( option.community !== this.community ) return false;
                        break;
                    case 1:
                        if ( option.community === this.community ) return false;
                        break;
                    default:
                        break;
                }
            } );
        };
        let c = Candidates();
        if ( !c.length ) {
            doDiff = doIt.MEH;
            c = Candidates();
            if ( !c.length ) {
                doHot = doIt.MEH;
                c = Candidates();
                if ( !c.length ) {
                    doFar = doIt.MEH;
                    const x = _.clone( this.system.settlements );
                    x.splice( this.system.settlements.indexOf( this ), 1 ) 
                    c = x;
                }
            }
        }
        const choice = _.sample( c ) as Settlement;
        if ( !choice ) return;
        const cType = new Culture()
        this.system.createConversation( this, choice, cType as Culture );
    }
    private createExhibition() {}
    private generateActor() {}

    private updateCommunity() {
        const decayRate = Math.LN2 / 240;
        const communities: Culture[] = [];
        for ( const mem of this.memories ) {
            if ( !communities.find( e => e === mem.type ) ) communities.push( mem.type );
        }
        const values:any[] = [];
        communities.map( com => {
            const thisVal = this.memories.filter( m => m.type === com )
                .map( v => Math.E ** ( -decayRate * ( this.system.age - v.time ) ) ).reduce( ( a, b ) => a + b );
            values.push( {c:com,val:thisVal} )
        } )
        const newMain = values.sort( ( a, b ) => a.val - b.val )[0].com as Culture;
        if ( Math.random() > this.options.form ) {
            let boop = false;
            if ( this.community !== newMain ) boop = true;
            this.community = newMain;
            if ( boop ) {
                this.system.__updateDist();
            }
        }
    }
}
