"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const App_1 = __importDefault(require("./App"));
const SystemController_1 = __importDefault(require("./classes/system/SystemController"));
const mySystem = new SystemController_1.default();
const myApp = new App_1.default(mySystem);
console.log(mySystem);
mySystem.addSettlement([1, 1, 1, 1, 1]);
mySystem.addSettlement([1, 1, 1, 1, 1]);
mySystem.addSettlement([1, 1, 1, 1, 1]);
mySystem.addSettlement([1, 1, 1, 1, 1]);
mySystem.addSettlement([1, 1, 1, 1, 1]);
mySystem.addSettlement([1, 1, 1, 1, 1]);
mySystem.addSettlement([1, 1, 1, 1, 1]);
let r;
r = lodash_1.default.random(0, 4, false);
mySystem.createConversation(mySystem.settlements[r], mySystem.settlements[r + 1], mySystem.settlements[r].community);
r = lodash_1.default.random(0, 4, false);
mySystem.createConversation(mySystem.settlements[r], mySystem.settlements[r + 1], mySystem.settlements[r].community);
r = lodash_1.default.random(0, 4, false);
mySystem.createConversation(mySystem.settlements[r], mySystem.settlements[r + 1], mySystem.settlements[r].community);
r = lodash_1.default.random(0, 4, false);
mySystem.createConversation(mySystem.settlements[r], mySystem.settlements[r + 1], mySystem.settlements[r].community);
exports.default = mySystem;
//# sourceMappingURL=index.js.map