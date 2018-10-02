"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const tinyqueue_1 = __importDefault(require("tinyqueue"));
const util_1 = require("util");
const sorting_json_1 = __importDefault(require("../../sorting.json"));
const settlement_1 = __importDefault(require("./settlement"));
const Conversation_1 = __importDefault(require("./settlementAspects/Conversation"));
const VoronoiController_1 = __importDefault(require("./VoronoiController"));
var Cultures;
(function (Cultures) {
    Cultures["ORG"] = "Orange";
    Cultures["GRN"] = "Green";
    Cultures["PPL"] = "Purple";
})(Cultures = exports.Cultures || (exports.Cultures = {}));
var SettlementCatEnum;
(function (SettlementCatEnum) {
    SettlementCatEnum[SettlementCatEnum["hobbies"] = 0] = "hobbies";
    SettlementCatEnum[SettlementCatEnum["personality"] = 1] = "personality";
    SettlementCatEnum[SettlementCatEnum["passion"] = 2] = "passion";
    SettlementCatEnum[SettlementCatEnum["traits"] = 3] = "traits";
    SettlementCatEnum[SettlementCatEnum["skills"] = 4] = "skills";
    SettlementCatEnum[SettlementCatEnum["entertainment"] = 5] = "entertainment";
})(SettlementCatEnum || (SettlementCatEnum = {}));
class SystemController {
    constructor() {
        this.roads = [];
        this.time = 0;
        this.day = 0;
        this.fameList = {};
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
                        if (util_1.isNullOrUndefined(costSoFar[next.i])) {
                            costSoFar[next.i] = 1000;
                        }
                        costSoFar[next.i] = lodash_1.default.min([
                            thisDist,
                            costSoFar[next.i]
                        ]);
                        frontier.push([next, thisDist]);
                    });
                    done.push(thisCell);
                }
            });
            this.__updateDist();
        };
        this.__age = 0;
        this.__running = true;
        this.__tick();
        this.vor = new VoronoiController_1.default(1200, 800);
        this.settlements = [];
        this.__distances = [];
        this.conversations = [];
        this.updateRealms();
    }
    get age() {
        return this.__age;
    }
    get dists() {
        return this.__distances;
    }
    calculateFame() {
        const frecensy = (memories) => {
            const decayRate = Math.LN2 / 800;
            return lodash_1.default.sum(memories.map(mem => Math.pow(Math.E, (-decayRate * (this.time - mem.time)))));
        };
        for (const member in this.fameList)
            delete this.fameList[member];
        this.settlements.map(st => {
            this.fameList[st.id] = frecensy(st.memories);
        });
    }
    createConversation(source, dest, type) {
        this.conversations.push(new Conversation_1.default(type, source, dest, this));
    }
    addSettlement(opts) {
        // sort options
        const options = {
            perf: 0.5,
            extro: 0.5,
            conv: 0.5,
            fame: 0.5,
            nrg: 5,
            res: 3,
            form: 0.5,
            disco: 0.5
        };
        // tslint:disable-next-line:forin
        for (const trait in options) {
            opts.map((cat, i) => {
                const catInfo = sorting_json_1.default[SettlementCatEnum[i]];
                options[trait] += catInfo[cat].traits[trait];
            });
            const t = options[trait];
            if (trait !== 'nrg' || 'res') {
                options[trait] = t > 0.9 ? 0.9 + (t - 0.9) / 5 : t < 0.1 ? 0.1 - (t + 1) / 10 : t;
            }
        }
        let foundHash = false;
        let hash = '05';
        while (!foundHash) {
            hash = lodash_1.default.random(1, 250, false).toString(16);
            foundHash = !lodash_1.default.includes(this.settlements.map(c => c.id), hash);
        }
        this.settlements.push(new settlement_1.default(this.vor.getFarCell(), hash, this, Cultures[lodash_1.default.random(2)], options));
    }
    __updateDist() {
        this.settlements.map(s => {
            this.settlements.map(f => {
                if (s === f)
                    return;
                this.__distances[this.settlements.indexOf(s)] = {
                    dist: this.vor.returnLength(s.cell, f.cell),
                    settlement: f
                };
            });
        });
    }
    __tick() {
        if (this.__running)
            setTimeout(this.__tick, 84);
        // console.log( `Ping! it's ${this.__age}` );
        if (this.time === 239) {
            this.__newDay();
        }
        this.__age++;
        this.time++;
        this.time = this.time % 240;
    }
    __newDay() { }
}
exports.default = SystemController;
//# sourceMappingURL=SystemController.js.map