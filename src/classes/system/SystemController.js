"use strict";
// This is the system controller
Object.defineProperty(exports, "__esModule", { value: true });
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
            console.log(`Ping! it's ${this.__age}`);
            this.__age++;
        };
        this.__age = 0;
        this.__running = true;
        this.__tick();
    }
    get age() {
        return this.__age;
    }
}
exports.default = SystemController;
//# sourceMappingURL=SystemController.js.map