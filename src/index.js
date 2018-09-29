"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settlement_1 = __importDefault(require("./classes/system/settlement"));
const SystemController_1 = __importDefault(require("./classes/system/SystemController"));
const mySystem = new SystemController_1.default();
mySystem.settlements.push(new settlement_1.default(mySystem.vor.cells[64]));
mySystem.updateRealms();
console.log(mySystem);
console.log(mySystem.vor.getFarCell());
//# sourceMappingURL=index.js.map