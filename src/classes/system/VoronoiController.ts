import { polygonCentroid } from 'd3-polygon';
import Vor from 'd3-voronoi';
import _ from 'lodash';
import VoronoiCell from './VoronoiCell';

export default class VoronoiController {
    public cells: VoronoiCell[];
    public readonly polygons: Array<
        Vor.VoronoiPolygon<VoronoiCell>
    >;
    private vFunc: Vor.VoronoiLayout<VoronoiCell>;
    constructor(
        w: number,
        h: number,
        r?: number
    ) {
        r = r || 16;
        // assign everything
        this.vFunc = Vor.voronoi<VoronoiCell>()
            .x( v => v.x )
            .y( v => v.y )
            .size( [ w, h ] );
        this.cells = _.range( 512 ).map( ix => {
            return new VoronoiCell(
                _.random( w, false ),
                _.random( h, false ),
                ix
            );
        } );
        // relax
        for ( let iter = 0; iter < r; iter++ ) {
            const dP = this.vFunc.polygons(
                this.cells
            );
            dP.map( p => {
                const [ x, y ] = polygonCentroid( p );
                p.data.setPos( x, y );
            } );
        }
        this.polygons = this.vFunc.polygons(
            this.cells
        );
    }
}
