import Vor from 'd3-voronoi';
import Settlement from './settlement'
import { Cultures } from './SystemController';

declare interface Road {}
declare interface Community {}
export default class VoronoiCell {
    public x = 0;
    public y = 0;
    public i = 0;
    public pgon?: Vor.VoronoiPolygon<VoronoiCell>;
    public neighbours = Array<VoronoiCell>();
    public type = CellTypes.empty;
    public occupant:
        | null
        | Settlement
        | Road[] = null;
    public minDistToSettlement = 1000;
    public closestSettlement: null | Settlement = null;
    public leadCommunity: Cultures = Cultures.GRN

    constructor( x: number, y: number, i: number ) {
        
        [ 'x', 'y', 'i' ].map(
            // @ts-ignore
            ( v, j ) => ( this[v] = arguments[j] )
        );
    }
    public setPos( x: number, y:number ) {
        this.x = x;
        this.y = y;
    }
}
enum CellTypes {
    empty = 0,
    road = 1,
    settlement = 2
}
