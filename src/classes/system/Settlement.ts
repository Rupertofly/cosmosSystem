import SystemController from "./SystemController";
import VoronoiCell from "./VoronoiCell";

declare interface Community { }

interface OptionTraits {
    /** Performativity: ratio of exhib to talk */
    perf: number;
    /** Extroverion: send to close or send to far */
    extro: number;
    /** Convincing: strength of soldiers */
    conv: number;
    /** Fame-hungry: talks to popular settlements */
    fame: number;
    /** Energy: how many spoons one has */
    nrg: number;
    /** Resilance: amount of walls a settlement can take */
    


}
export default class Settlement {

    constructor(
        public cell: VoronoiCell,
        public id: string,
        public system: SystemController,
        public community: Community,
        public options: OptionTraits
    ) {
    }
}