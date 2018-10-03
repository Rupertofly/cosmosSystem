import _ from 'lodash'
import App from './App';
import Community from './classes/system/Community';
import Settlement from './classes/system/settlement';
import SystemController, { Cultures } from './classes/system/SystemController';

const mySystem: SystemController = new SystemController();
const myApp = new App( mySystem );

console.log( mySystem );
mySystem.addSettlement( [ 1, 1, 1, 1, 1 ] );
mySystem.addSettlement( [ 1, 1, 1, 1, 1 ] );
mySystem.addSettlement( [ 1, 1, 1, 1, 1 ] );
mySystem.addSettlement( [ 1, 1, 1, 1, 1 ] );
mySystem.addSettlement( [ 1, 1, 1, 1, 1 ] );
mySystem.addSettlement( [ 1, 1, 1, 1, 1 ] );
mySystem.addSettlement( [ 1, 1, 1, 1, 1 ] );
let r;
r = _.random( 0, 4,false );
mySystem.createConversation( mySystem.settlements[r], mySystem.settlements[r + 1], mySystem.settlements[r].community as Cultures )
r = _.random( 0, 4,false );
mySystem.createConversation( mySystem.settlements[r], mySystem.settlements[r + 1], mySystem.settlements[r].community as Cultures )
r = _.random( 0, 4,false );
mySystem.createConversation( mySystem.settlements[r], mySystem.settlements[r + 1], mySystem.settlements[r].community as Cultures )
r = _.random( 0, 4,false );
mySystem.createConversation( mySystem.settlements[r], mySystem.settlements[r+1], mySystem.settlements[r].community as Cultures )
export default mySystem 