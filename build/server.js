"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//configure cors
const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
//port
const { PORT } = process.env;
//routes
app.get('/', (req, res) => {
    res.send('Hello Node Js Server');
});
app.use('/api/v1', routes_1.default);
app.get('/test-cors', (0, cors_1.default)(corsOptions), (req, res, next) => {
    res.json({ msg: 'This cors is enabled with a middle ware' });
});
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
exports.default = app;
