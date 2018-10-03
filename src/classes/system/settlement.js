"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const Road_1 = __importDefault(require("./Road"));
const SystemController_1 = require("./SystemController");
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
        this.Exhibits = {
            Orange: 1,
            Green: 1,
            Purple: 1,
            getLength() {
                return this.Orange + this.Green + this.Purple;
            },
            doNormalise() {
                const size = this.getLength();
                this.Orange = lodash_1.default.floor((this.Orange / size) * 10);
                this.Green = lodash_1.default.floor((this.Green / size) * 10);
                this.Purple = lodash_1.default.floor((this.Purple / size) * 10);
            },
            addExhibit(col) {
                if (this.getLength() > 30)
                    this.doNormalise();
                this[col]++;
            }
        };
        this.strength = 3;
        this.memories = [];
        this.spoons = 5;
        this.timeSinceSpoon = 0;
        this.history = [];
        this.strength = options.res;
        this.spoons = lodash_1.default.floor((1 - system.time / 240) * options.nrg);
        system.fameList[this.id] = -1;
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
                    c = Candidates();
                }
            }
        }
        const choice = lodash_1.default.sample(c);
        if (!choice)
            return;
        const cType = Math.random() > 0.5
            ? this.community
            : this.community !== choice.community &&
                Math.random() < this.options.form
                ? this.community
                : lodash_1.default.sample([SystemController_1.Cultures.GRN, SystemController_1.Cultures.PPL, SystemController_1.Cultures.ORG].splice([SystemController_1.Cultures.GRN, SystemController_1.Cultures.PPL, SystemController_1.Cultures.ORG].indexOf(this.community), 1));
        this.system.createConversation(this, choice, cType);
    }
    createExhibition() { }
    generateActor() { }
    updateCommunity() {
        const decayRate = Math.LN2 / 240;
        const orange = this.memories
            .filter(m => m.type === SystemController_1.Cultures.ORG)
            .map(v => Math.pow(Math.E, (-decayRate * (this.system.age - v.time))))
            .reduce((a, b) => a + b);
        const green = this.memories
            .filter(m => m.type === SystemController_1.Cultures.GRN)
            .map(v => Math.pow(Math.E, (-decayRate * (this.system.age - v.time))))
            .reduce((a, b) => a + b);
        const purple = this.memories
            .filter(m => m.type === SystemController_1.Cultures.PPL)
            .map(v => Math.pow(Math.E, (-decayRate * (this.system.age - v.time))))
            .reduce((a, b) => a + b);
        const newMain = orange > green
            ? orange > purple
                ? SystemController_1.Cultures.ORG
                : SystemController_1.Cultures.PPL
            : green > purple
                ? SystemController_1.Cultures.GRN
                : SystemController_1.Cultures.PPL;
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