"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const tinyqueue_1 = __importDefault(require("tinyqueue"));
const util_1 = require("util");
const VoronoiController_1 = __importDefault(require("./VoronoiController"));
// This is the system controller
class SystemController {
    constructor() {
        this.pause = () => {
            this.__running = false;
        };
        this.play = () => {
            this.__running = true;
            this.__tick();
        };
        this.updateRealms = () => {
            const cost = (cell) => {
                switch (cell.type) {
                    case 0:
                        return 1;
                    case 1:
                        return 0.2;
                    case 2:
                        return 5;
                    default:
                        return 1;
                }
            };
            this.settlements.map(s => {
                const frontier = new tinyqueue_1.default([], (a, b) => a[1] - b[1]);
                frontier.push([s.cell, 0]);
                const costSoFar = {};
                costSoFar[s.cell.i] = 0;
                const done = [];
                while (frontier.length) {
                    const thisCell = frontier.pop()[0];
                    if (lodash_1.default.includes(done, thisCell) &&
                        costSoFar[thisCell.i] >= thisCell.minDistToSettlement) {
                        continue;
                    }
                    if (thisCell.type !== 2 &&
                        costSoFar[thisCell.i] < thisCell.minDistToSettlement) {
                        thisCell.minDistToSettlement = costSoFar[thisCell.i];
                        thisCell.closestSettlement = s;
                        thisCell.leadCommunity = s.community;
                    }
                    thisCell.neighbours.map(next => {
                        const thisDist = costSoFar[thisCell.i] + cost(next);
                        if (util_1.isNullOrUndefined(costSoFar[next.i]))
                            costSoFar[next.i] = 1000;
                        costSoFar[next.i] = lodash_1.default.min([thisDist, costSoFar[next.i]]);
                        frontier.push([next, thisDist]);
                    });
                    done.push(thisCell);
                }
            });
        };
        this.__tick = () => {
            if (this.__running)
                setTimeout(this.__tick, 84);
            // console.log( `Ping! it's ${this.__age}` );
            this.__age++;
        };
        this.__age = 0;
        this.__running = true;
        this.__tick();
        this.vor = new VoronoiController_1.default(1200, 800);
        this.settlements = [];
    }
    get age() {
        return this.__age;
    }
}
exports.default = SystemController;
//# sourceMappingURL=SystemController.js.map