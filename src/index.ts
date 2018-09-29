import Settlement from './classes/system/settlement';
import SystemController from './classes/system/SystemController';

const mySystem: SystemController = new SystemController();
mySystem.settlements.push( new Settlement( mySystem.vor.cells[64] ) );
mySystem.updateRealms();
console.log( mySystem );
const c = mySystem.vor.getFarCell()
console.log( c );
console.log( mySystem.vor.returnPath( mySystem.settlements[0].cell, c ) )