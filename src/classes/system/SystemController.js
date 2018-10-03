"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_1 = require("d3");
const lodash_1 = __importDefault(require("lodash"));
const tinyqueue_1 = __importDefault(require("tinyqueue"));
const util_1 = require("util");
const sort_1 = __importDefault(require("../../sort"));
const Road_1 = __importDefault(require("./Road"));
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
        this.controller = null;
        this.visualiser = null;
        this.conversations = [];
        this.roads = [];
        this.time = 0;
        this.day = 0;
        this.fameList = {};
        this._dirtyRoads = true;
        this._dirtyRealms = true;
        this._dirtySettlements = true;
        this._hasVis = false;
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
        this.vor = new VoronoiController_1.default(1200, 800);
        this.settlements = [];
        this.__distances = [];
        this.settlements.push(new settlement_1.default(this.vor.cells.find(g => {
            return d3_1.polygonContains(g.pgon, [600, 400]);
        }) || this.vor.cells[0], '000', this, Cultures.GRN, {
            perf: 0.9,
            extro: 0.5,
            conv: 0.1,
            fame: 0.6,
            nrg: 1,
            res: 100,
            form: 0.8,
            disco: 0.5
        }));
        this.updateRealms();
        this.__age = 0;
        this.__running = false;
    }
    get age() {
        return this.__age;
    }
    get dists() {
        return this.__distances;
    }
    attachController(socket) {
        this.controller = socket;
        socket.on('new_set', (setObj) => {
            const retVal = this.addSettlement(setObj);
            socket.emit('hash', retVal);
        });
    }
    attachVisualiser(socket) {
        this.visualiser = socket;
        this._hasVis = true;
        this._dirtyRealms = true;
        this._dirtyRoads = true;
        this._dirtySettlements = true;
        this.__running = true;
        setInterval(((t) => {
            return () => t.__tick();
        })(this), 1000 / 12);
    }
    calculateFame() {
        const frecensy = (memories) => {
            const decayRate = Math.LN2 / 800;
            return lodash_1.default.sum(memories.map(mem => Math.pow(Math.E, (-decayRate * (this.__age - mem.time)))));
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
                // @ts-ignore
                const catInfo = sort_1.default[SettlementCatEnum[i]];
                options[trait] += catInfo[cat].traits[trait];
            });
            const t = options[trait];
            if (trait !== 'nrg' && trait !== 'res') {
                options[trait] =
                    t > 0.9
                        ? 0.9
                        : t < 0.1
                            ? 0.1
                            : t;
            }
        }
        let foundHash = false;
        let hash = '05';
        while (!foundHash) {
            hash = lodash_1.default.random(1, 250, false).toString(16);
            foundHash = !lodash_1.default.includes(this.settlements.map(c => c.id), hash);
        }
        const thisSet = new settlement_1.default(this.vor.getFarCell(), hash, this, ["Green", "Orange", "Purple"][lodash_1.default.random(0, 2, false)], options);
        this.settlements.push(thisSet);
        this._dirtySettlements = true;
        this.updateRealms();
        if (this.settlements.length > 1) {
            this.settlements.map(set => {
                if (set === thisSet)
                    return;
                this.roads.push(new Road_1.default(thisSet, set, this));
            });
        }
        return hash;
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
        this._dirtyRealms = true;
    }
    draw() {
        const dObj = {
            conversations: this.conversations.map(c => {
                return { x: c.position[0], y: c.position[1], c: c.type };
            })
        };
        if (this._dirtyRoads) {
            dObj.roads = this.roads.map(r => ({
                path: r.path(),
                state: r.use
            }));
            this._dirtyRoads = false;
        }
        if (this._dirtySettlements) {
            dObj.settlements = this.settlements.map(s => {
                return {
                    x: s.cell.x,
                    y: s.cell.y,
                    id: s.id,
                    colour: s.community
                };
            });
            this._dirtySettlements = false;
        }
        if (this._dirtyRealms) {
            dObj.realms = this.vor.cells.map(c => {
                return {
                    pgon: c.pgon,
                    colour: c.leadCommunity
                };
            });
            this._dirtyRealms = false;
        }
        return dObj;
    }
    __tick() {
        // tslint:disable-next-line:no-this-assignment
        const that = this;
        if (that.time === 239) {
            that.__newDay();
        }
        that.__age++;
        that.time++;
        that.time = that.time % 240;
        that.conversations.map(c => c.update());
        if (that.settlements) {
            that.settlements.map(s => s.update());
        }
        if (that.roads) {
            lodash_1.default.sampleSize(that.roads, lodash_1.default.min([that.roads.length, 30])).map(r => r.update());
        }
        if (that._hasVis) {
            const s = that.visualiser;
            // @ts-ignore
            that.visualiser.emit('draw', that.draw());
        }
    }
    __newDay() {
        this.settlements.map(s => s.refresh());
        this.day++;
    }
}
exports.default = SystemController;
//# sourceMappingURL=SystemController.js.map