import _ from 'lodash'
import App from './App';
import Settlement from './classes/system/settlement';
import SystemController from './classes/system/SystemController';

const mySystem: SystemController = new SystemController();
mySystem.addSettlement( undefined,'ffff' )
mySystem.addSettlement()
const myApp = new App( mySystem );
export default mySystem 