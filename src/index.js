"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const SystemController_1 = __importDefault(require("./classes/system/SystemController"));
const mySystem = new SystemController_1.default();
mySystem.addSettlement(undefined, 'ffff');
mySystem.addSettlement();
mySystem.addSettlement();
mySystem.addSettlement();
const myApp = new App_1.default(mySystem);
exports.default = mySystem;
//# sourceMappingURL=index.js.map