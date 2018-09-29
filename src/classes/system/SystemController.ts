import _ from 'lodash';
import Que from 'tinyqueue';
import { isNullOrUndefined } from 'util';
import Settlement from './settlement';
import VoronoiCell from './VoronoiCell';
import VoronoiController from './VoronoiController';
// This is the system controller

export default class SystemController {
    get age() {
        return this.__age;
    }
    public vor: VoronoiController;
    public settlements: Settlement[];
    private __age: number;
    private __running: boolean;

    constructor() {
        this.__age = 0;
        this.__running = true;
        this.__tick();
        this.vor = new VoronoiController( 1200, 800 );
        this.settlements = [];
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
                    costSoFar[thisCell.i ] < thisCell.minDistToSettlement
                ) {
                    thisCell.minDistToSettlement = costSoFar[thisCell.i];
                    thisCell.closestSettlement = s;
                    thisCell.leadCommunity = s.community;
                }
                
                thisCell.neighbours.map( next => {
                    const thisDist = costSoFar[thisCell.i] + cost( next );
                    if ( isNullOrUndefined( costSoFar[next.i] ) ) costSoFar[next.i] = 1000;
                    costSoFar[next.i] = _.min( [ thisDist, costSoFar[next.i] ] ) as number;
                    frontier.push( [ next, thisDist ] );
                } );
                done.push( thisCell );
            }
        } );
    };
    private __tick = () => {
        if ( this.__running ) setTimeout( this.__tick, 84 );
        // console.log( `Ping! it's ${this.__age}` );
        this.__age++;
    };
}
