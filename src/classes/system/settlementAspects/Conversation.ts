import * as d3P from 'd3-polygon';
import { isUndefined } from 'util';
import Road from '../Road'
import Settlement from '../settlement';
import SystemController, { Cultures } from '../SystemController';

export default class Conversation {
    public speed = 4;
    public position: [number, number];
    public path: Array<[number, number]>;
    public road: Road;
    private __index = 0;
    constructor(
        public type: Cultures,
        public source: Settlement,
        public dest: Settlement,
        public system: SystemController
    ) {
        
        const road = system.roads.find( r => r.isThisroad( source, dest ) )  
        if ( isUndefined( road ) ) throw new Error( 'WTF mate, that is no road' )
        this.road = road;
        this.path = road.path( this.source );
        this.position = this.path[this.__index];
    }
    public update() {
        if ( this.path.length - this.__index < 5 ) {
            this._remove();
            return;
        }
        this.__index++
        this.position = this.path[this.__index];
    }
    private _remove() {
        this.dest.receiveConversation( this );
    }
}

