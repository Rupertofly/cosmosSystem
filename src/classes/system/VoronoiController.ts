import aStar from 'a-star';
import { polygonCentroid } from 'd3-polygon';
import * as Vor from 'd3-voronoi';
import * as GH from 'greiner-hormann'
import _ from 'lodash';

import calibrateShape from '../../calibrate'
import VoronoiCell from './VoronoiCell';
export default class VoronoiController {
    public cells: VoronoiCell[];
    public readonly polygons: Array<Vor.VoronoiPolygon<VoronoiCell>>;
    private vFunc: Vor.VoronoiLayout<VoronoiCell>;
    constructor( w: number, h: number, r?: number ) {
        r = r || 256;
        // assign everything
        const vv = Vor;
        console.log( Vor );
        this.vFunc = Vor.voronoi<VoronoiCell>()
            .x( v => v.x )
            .y( v => v.y )
            .size( [ w, h ] );
        this.cells = _.range( 512 ).map( ix => {
            return new VoronoiCell( 500+_.random( true )*50, 500+_.random( true )*50, ix );
        } );
        // relax
        for ( let iter = 0; iter < r; iter++ ) {
            const dP = this.vFunc.polygons( this.cells );
            dP.map( p => {
                const cr = GH.intersection( calibrateShape.reverse(), p )[0];
                cr.data = p.data;

                const [ x, y ] = polygonCentroid( cr );
                p.data.setPos( x, y );
            } );
        }
        this.polygons = this.vFunc.polygons( this.cells ).map( i => {
            const cr = GH.intersection( calibrateShape.reverse(), i )[0];
            cr.data = i.data;
            return cr
        } );
        const dg = this.vFunc( this.cells ).links();
        dg.map( l => {
            l.source.neighbours.push( l.target );
            l.target.neighbours.push( l.source );
        } );
        this.polygons.map( pg => pg.data.pgon = pg );
    }
    public getFarCell() {
        return this.cells.reduce( ( p, c ) => {
            return p.minDistToSettlement >= c.minDistToSettlement ? p : c;
        } );
    }
    public returnPath( start: VoronoiCell, finish: VoronoiCell ) {
        return aStar<VoronoiCell>( {
            start,
            isEnd: n => n === finish,
            neighbor: n => n.neighbours,
            distance: ( a, b ) => this.cost( b ),
            heuristic: a => Math.abs( a.x - finish.x ) + Math.abs( a.y - finish.y ),
            hash: n => `n${n.i}x`
        } ).path;
    }
    public returnLength( start: VoronoiCell, finish: VoronoiCell ) {
        return this.returnPath( start, finish ).length * 30;
    }
    private cost = ( cell: VoronoiCell ) => {
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
}
