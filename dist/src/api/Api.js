"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.set("json spaces", 2);
function init() {
    app.use("/", require("./routes/Home"));
    const listener = app.listen(process.env.PORT ? process.env.PORT : 8080, () => {
        console.log(`Listening to ${listener.address().port}`);
    });
}
exports.init = init;
