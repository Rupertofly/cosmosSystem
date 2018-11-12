import _ from 'lodash'
import * as P from '../../pallete'
export default class Culture {
    public id: string;
    public colour: string;
    constructor() {
        this.id = _.random( 257, 4095, false ).toString( 16 );
        this.colour = P.getC( _.random( 3,14 ),3 ).hex
    }
}