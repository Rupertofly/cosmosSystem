"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Settlement {
    constructor(cell, id, system, community, options) {
        this.cell = cell;
        this.id = id;
        this.system = system;
        this.community = community;
        this.options = options;
        this.spoons = 5;
    }
    update() { }
    refresh() {
        this.spoons = this.options.disco;
    }
}
exports.default = Settlement;
//# sourceMappingURL=settlement.js.map