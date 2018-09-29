"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
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
        this.spoons = 5;
        this.timeSinceSpoon = 0;
        this.strength = options.res;
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
    useSpoon() {
        this.spoons--;
        // chance for repair
        if (this.strength < this.options.res && Math.random() < 0.8) {
            this.strength++;
            return;
        }
        // Act or present
        if (Math.random() < 0.2) {
            this.generateActor();
            return;
        }
        // conversation of exhibition
        if (Math.random() < this.options.perf)
            ;
    }
}
exports.default = Settlement;
//# sourceMappingURL=settlement.js.map