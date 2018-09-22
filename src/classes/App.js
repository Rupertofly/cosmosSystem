"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
class App {
    constructor() {
        this.express = express_1.default();
        this.mountRoutes();
    }
    sockServe(server) {
        this.socket = socket_io_1.default(server);
        this.socket.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('msg', (data) => {
                console.log(`received ${data}`);
            });
        });
    }
    mountRoutes() {
        const router = express_1.default.Router();
        router.use(express_1.default.static('./public'));
        this.express.use('/', router);
        console.log(__dirname);
        const serve = this.express.listen(80, (err) => {
            if (err) {
                console.log(err);
            }
            return console.log(`server is listening on ${80}`);
        });
        this.sockServe(serve);
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map