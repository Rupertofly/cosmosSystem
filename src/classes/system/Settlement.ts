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
    private spoons = 5;
    constructor(
        public cell: VoronoiCell,
        public id: string,
        public system: SystemController,
        public community: Community,
        public options: OptionTraits
    ) {}

    public update() {}
    public refresh() {
        this.spoons = this.options.disco;
    }
}
