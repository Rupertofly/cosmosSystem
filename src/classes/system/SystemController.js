"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    }
    get age() {
        return this.__age;
    }
}
exports.default = SystemController;
//# sourceMappingURL=SystemController.js.map