import VoronoiCell from "./VoronoiCell";

declare interface Community {}
export default class Settlement {
    public cell: VoronoiCell;
    public mComunity: null | Community = null;
    constructor( cell?: VoronoiCell ) {
        this.cell = cell || new VoronoiCell( 32,32,600 );
    }
}