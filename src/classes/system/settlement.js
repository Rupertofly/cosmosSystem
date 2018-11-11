"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const Culture_1 = __importDefault(require("./Culture"));
const Road_1 = __importDefault(require("./Road"));
var doIt;
(function (doIt) {
    doIt[doIt["DO"] = 0] = "DO";
    doIt[doIt["DONT"] = 1] = "DONT";
    doIt[doIt["MEH"] = 2] = "MEH";
})(doIt || (doIt = {}));
class Memory {
    constructor(settlement, type, time) {
        this.settlement = settlement;
        this.type = type;
        this.time = time;
    }
}
exports.Memory = Memory;
class Settlement {
    constructor(cell, id, system, community, options) {
        this.cell = cell;
        this.id = id;
        this.system = system;
        this.community = community;
        this.options = options;
        this.strength = 3;
        this.memories = [];
        this.spoons = 5;
        this.timeSinceSpoon = 0;
        this.history = [];
        this.strength = options.res;
        this.spoons = lodash_1.default.floor((1 - system.time / 240) * options.nrg);
        system.fameList[this.id] = 30;
        this.roads = [];
        this.system.settlements.map(st => {
            if (st === this)
                return;
            this.roads.push(new Road_1.default(st, this, this.system));
        });
        this.system._dirtyRoads = true;
    }
    update() {
        if (lodash_1.default.random(0, lodash_1.default.floor(240 - this.system.time / this.spoons + 1) + 1, false) < this.timeSinceSpoon &&
            this.spoons) {
            this.useSpoon();
            return;
        }
        this.timeSinceSpoon++;
    }
    refresh() {
        this.spoons = this.options.nrg;
    }
    receiveConversation(conv) {
        this.memories.push(new Memory(conv.source, conv.type, this.system.age));
        lodash_1.default.remove(this.system.conversations, c => c === conv);
    }
    getFame() {
        return this.system.fameList[this.id];
    }
    useSpoon() {
        /* this.spoons--;
        // chance for repair
        if ( this.strength < this.options.res && Math.random() < 0.8 ) {
            this.strength++;
            return;
        }
        // Act or present
        if ( Math.random() < 0.2 ) {
            this.generateActor();
            return;
        }
        // conversation of exhibition
        if ( Math.random() < this.options.perf ) {
            this.sendConversation();
            return;
        }
        this.createExhibition(); */
        this.spoons--;
        this.sendConversation();
    }
    sendConversation() {
        const hotOrNot = lodash_1.default.mean(lodash_1.default.values(this.system.fameList));
        let doHot = Math.random() < this.options.fame
            ? doIt.DO
            : Math.random() > this.options.fame
                ? doIt.DONT
                : doIt.MEH;
        const nearOrFar = lodash_1.default.mean(this.roads.map(r => r.length));
        let doFar = Math.random() < this.options.extro - 0.05
            ? doIt.DO
            : Math.random() > this.options.extro + 0.05
                ? doIt.DONT
                : doIt.MEH;
        let doDiff = Math.random() < this.options.disco
            ? doIt.DO
            : Math.random() > this.options.extro
                ? doIt.DONT
                : doIt.MEH;
        const Candidates = () => {
            return this.system.settlements.filter(option => {
                switch (doHot) {
                    case 0:
                        if (option.getFame() < hotOrNot)
                            return false;
                        break;
                    case 1:
                        if (option.getFame() > hotOrNot)
                            return false;
                        break;
                    default:
                        break;
                }
                switch (doFar) {
                    case 0:
                        if (this.system.vor.returnLength(this.cell, option.cell) < hotOrNot) {
                            return false;
                        }
                        break;
                    case 1:
                        if (this.system.vor.returnLength(this.cell, option.cell) > hotOrNot) {
                            return false;
                        }
                        break;
                    default:
                        break;
                }
                switch (doDiff) {
                    case 0:
                        if (option.community !== this.community)
                            return false;
                        break;
                    case 1:
                        if (option.community === this.community)
                            return false;
                        break;
                    default:
                        break;
                }
            });
        };
        let c = Candidates();
        if (!c.length) {
            doDiff = doIt.MEH;
            c = Candidates();
            if (!c.length) {
                doHot = doIt.MEH;
                c = Candidates();
                if (!c.length) {
                    doFar = doIt.MEH;
                    const x = lodash_1.default.clone(this.system.settlements);
                    x.splice(this.system.settlements.indexOf(this), 1);
                    c = x;
                }
            }
        }
        const choice = lodash_1.default.sample(c);
        if (!choice)
            return;
        const cType = new Culture_1.default();
        this.system.createConversation(this, choice, cType);
    }
    createExhibition() { }
    generateActor() { }
    updateCommunity() {
        const decayRate = Math.LN2 / 240;
        const communities = [];
        for (const mem of this.memories) {
            if (!communities.find(e => e === mem.type))
                communities.push(mem.type);
        }
        const values = [];
        communities.map(com => {
            const thisVal = this.memories.filter(m => m.type === com)
                .map(v => Math.pow(Math.E, (-decayRate * (this.system.age - v.time)))).reduce((a, b) => a + b);
            values.push({ c: com, val: thisVal });
        });
        const newMain = values.sort((a, b) => a.val - b.val)[0].com;
        if (Math.random() > this.options.form) {
            let boop = false;
            if (this.community !== newMain)
                boop = true;
            this.community = newMain;
            if (boop) {
                this.system.__updateDist();
            }
        }
    }
}
exports.default = Settlement;
//# sourceMappingURL=settlement.js.map