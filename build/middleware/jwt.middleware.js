"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = exports.verifyJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function generateJWT(payload, secret) {
    return jsonwebtoken_1.default.sign(payload, secret);
}
exports.generateJWT = generateJWT;
const verifyJWTToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            res.status(401).send('Authorization header is missing');
            return;
        }
        const token = authorizationHeader.split(' ')[1];
        if (!process.env.TOKEN_SECRET) {
            res.status(500).send('Missing TOKEN_SECRET env variable');
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401).send('Invalid token');
    }
};
exports.verifyJWTToken = verifyJWTToken;
