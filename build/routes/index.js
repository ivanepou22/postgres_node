"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./users"));
const index_1 = __importDefault(require("./courses/index"));
const routes = express_1.default.Router();
routes.use(index_1.default);
routes.use(users_1.default);
exports.default = routes;
