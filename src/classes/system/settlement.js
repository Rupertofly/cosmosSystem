"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VoronoiCell_1 = __importDefault(require("./VoronoiCell"));
class Settlement {
    constructor(cell) {
        this.mComunity = null;
        this.cell = cell || new VoronoiCell_1.default(32, 32, 600);
    }
}
exports.default = Settlement;
//# sourceMappingURL=settlement.js.map