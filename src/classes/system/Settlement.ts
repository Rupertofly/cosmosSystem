import _ from 'lodash';
import SystemController from './SystemController';
import VoronoiCell from './VoronoiCell';

declare interface Community {}

/**
 * A set of particular trais
 *
 * @interface OptionTraits
 */
interface OptionTraits {
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
export default class Settlement {
    public readonly Exhibits = {
        Orange: 1,
        Green: 1,
        Purple: 1,
        getLength() {
            return this.Orange + this.Green + this.Purple;
        },
        doNormalise() {
            const size = this.getLength();
            this.Orange = _.floor( ( this.Orange / size ) * 10 );
            this.Green = _.floor( ( this.Green / size ) * 10 );
            this.Purple = _.floor( ( this.Purple / size ) * 10 );
        },
        addExhibit( col: 'Orange' | 'Green' | 'Purple' ) {
            if ( this.getLength() > 30 ) this.doNormalise();
            this[col]++;
        }
    };
    public strength = 3;
    private spoons = 5;
    private timeSinceSpoon = 0;
    constructor(
        public cell: VoronoiCell,
        public id: string,
        public system: SystemController,
        public community: Community,
        public options: OptionTraits
    ) {
        this.strength = options.res;
    }

    public update() {
        if (
            _.random(
                0,
                _.floor( 240 - this.system.time / this.spoons + 1 ) + 1,
                false
            ) < this.timeSinceSpoon &&
            this.spoons
        ) {
            this.useSpoon();
            return;
        }
        this.timeSinceSpoon++;
    }
    public refresh() {
        this.spoons = this.options.nrg;
    }
    private useSpoon() {
        this.spoons--;
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
        if ( Math.random() < this.options.perf )
    }
    private sendConversation();
    private createExhibition();
    private generateActor();
}
