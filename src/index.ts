import Community from './classes/system/Community';
import Settlement from './classes/system/settlement';
import SystemController from './classes/system/SystemController';

const mySystem: SystemController = new SystemController();
mySystem.settlements.push( new Settlement( mySystem.vor.cells[64],'FG',mySystem,new Community(), {perf:1,extro:1,conv:1,fame:1,nrg:5,res:1,form:1,disco:1} ) );
mySystem.updateRealms();
console.log( mySystem );
const c = mySystem.vor.getFarCell()
console.log( c );
console.log( mySystem.vor.returnPath( mySystem.settlements[0].cell, c ) )
export default mySystem