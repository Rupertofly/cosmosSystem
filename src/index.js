"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Community_1 = __importDefault(require("./classes/system/Community"));
const settlement_1 = __importDefault(require("./classes/system/settlement"));
const SystemController_1 = __importDefault(require("./classes/system/SystemController"));
const mySystem = new SystemController_1.default();
mySystem.settlements.push(new settlement_1.default(mySystem.vor.cells[64], 'FG', mySystem, new Community_1.default(), { perf: 1, extro: 1, conv: 1, fame: 1, nrg: 5, res: 1, form: 1, disco: 1 }));
mySystem.updateRealms();
console.log(mySystem);
const c = mySystem.vor.getFarCell();
console.log(c);
console.log(mySystem.vor.returnPath(mySystem.settlements[0].cell, c));
exports.default = mySystem;
//# sourceMappingURL=index.js.map