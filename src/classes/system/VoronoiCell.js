"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoronoiCell {
    constructor(x, y, i) {
        this.x = 0;
        this.y = 0;
        this.i = 0;
        this.neighbours = Array();
        this.type = CellTypes.empty;
        this.occupant = null;
        this.minDistToSettlement = 1000;
        this.closestSettlement = null;
        this.leadCommunity = null;
        ['x', 'y', 'i'].map(
        // @ts-ignore
        (v, j) => (this[v] = arguments[j]));
    }
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.default = VoronoiCell;
var CellTypes;
(function (CellTypes) {
    CellTypes[CellTypes["empty"] = 0] = "empty";
    CellTypes[CellTypes["road"] = 1] = "road";
    CellTypes[CellTypes["settlement"] = 2] = "settlement";
})(CellTypes || (CellTypes = {}));
//# sourceMappingURL=VoronoiCell.js.map