"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const a_star_1 = __importDefault(require("a-star"));
const d3_polygon_1 = require("d3-polygon");
const Vor = __importStar(require("d3-voronoi"));
const lodash_1 = __importDefault(require("lodash"));
const VoronoiCell_1 = __importDefault(require("./VoronoiCell"));
class VoronoiController {
    constructor(w, h, r) {
        this.cost = (cell) => {
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
        r = r || 16;
        // assign everything
        const vv = Vor;
        console.log(Vor);
        this.vFunc = Vor.voronoi()
            .x(v => v.x)
            .y(v => v.y)
            .size([w, h]);
        this.cells = lodash_1.default.range(512).map(ix => {
            return new VoronoiCell_1.default(lodash_1.default.random(w, false), lodash_1.default.random(h, false), ix);
        });
        // relax
        for (let iter = 0; iter < r; iter++) {
            const dP = this.vFunc.polygons(this.cells);
            dP.map(p => {
                const [x, y] = d3_polygon_1.polygonCentroid(p);
                p.data.setPos(x, y);
            });
        }
        this.polygons = this.vFunc.polygons(this.cells);
        const dg = this.vFunc(this.cells).links();
        dg.map(l => {
            l.source.neighbours.push(l.target);
            l.target.neighbours.push(l.source);
        });
    }
    getFarCell() {
        return this.cells.reduce((p, c) => {
            return p.minDistToSettlement >= c.minDistToSettlement ? p : c;
        });
    }
    returnPath(start, finish) {
        return a_star_1.default({
            start,
            isEnd: n => n === finish,
            neighbor: n => n.neighbours,
            distance: (a, b) => this.cost(b),
            heuristic: a => Math.abs(a.x - finish.x) + Math.abs(a.y - finish.y),
            hash: n => `n${n.i}x`
        }).path;
    }
    returnLength(start, finish) {
        return this.returnPath(start, finish).length * 30;
    }
}
exports.default = VoronoiController;
//# sourceMappingURL=VoronoiController.js.map