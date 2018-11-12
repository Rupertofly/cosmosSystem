import * as d3P from 'd3-interpolate';
import _ from 'lodash';
import Settlement from "./settlement";
import SystemController from "./SystemController";
import VoronoiCell from './VoronoiCell';

export default class Road {
    public length: number;
    public use: number;
    public lastUse: number;
    public stops: VoronoiCell[];
    public segmentCount: number; 
    private __path: Array<[number, number]>
    constructor(
        public destA: Settlement,
        public destB: Settlement,
        private system: SystemController
    ) {
        this.use = 1
        this.length = system.vor.returnLength( destA.cell, destB.cell );
        this.stops = system.vor.returnPath( destA.cell, destB.cell );
        this.stops.map( cell => {
            cell.type = cell.type === 0 ? 1 : cell.type;
            if ( cell.occupant === null ) cell.occupant = [ this ]; else if ( cell.occupant instanceof Array ) cell.occupant.push( this );
        } )
        this.segmentCount = _.floor( this.length / 1.2 );
        this.__path = [];
        const [ ix,iy ] = [
            d3P.interpolateBasis( this.stops.map( c => c.x ) ),
            d3P.interpolateBasis( this.stops.map( c => c.y ) )
        ]
    
        for ( let t = 0; t < 1; t += 1 / this.segmentCount ) {
            this.__path.push(
                [ ix( t ), iy( t ) ] );
        }
        this.lastUse = system.age;

    }
    public isMember( st: Settlement ) {
        return this.destA === st ? true : this.destB === st;
    }
    public useRoad() {
        this.lastUse = this.system.age;
        this.update()
    }
    public update() {
        if ( this.use === 1 && this.system.age - this.lastUse > 500 ) {
            this.use = 0;
            this.system._dirtyRoads = true;
        }
        if ( this.use === 0 && this.system.age - this.lastUse < 100 ) {
            this.use = 1;
            this.system._dirtyRoads = true;
        }

    }
    public isThisroad( a: Settlement, b: Settlement ) {
        return this.destA === a ? this.destB === b ? true : false : this.destB === a ? this.destA === b : false;
    }
    public path( start?: Settlement ) {
        if ( start === undefined ) return this.__path;
        if ( start === this.destB ) return _.cloneDeep( this.__path ).reverse();
        return this.__path;
    }
}