"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./classes/App"));
console.log(`\
Started\
`);
const port = 80;
console.log(__dirname);
App_1.default.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map