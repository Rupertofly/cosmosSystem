import _ from 'lodash'
import App from './App';
import Settlement from './classes/system/settlement';
import SystemController from './classes/system/SystemController';

const mySystem: SystemController = new SystemController();
mySystem.addSettlement( undefined,'ffff' )
mySystem.addSettlement()
<<<<<<< HEAD
mySystem.addSettlement()
mySystem.addSettlement()
=======
>>>>>>> 33cd1fa22d975dc254747bba1913c132eefe378e
const myApp = new App( mySystem );
export default mySystem 