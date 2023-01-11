"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../../controllers/users.controller");
const users = express_1.default.Router();
users.get('/users', users_controller_1.getUsers);
users.get('/user/:id', users_controller_1.getUserById);
users.get('/user/username/:username', users_controller_1.getUserByUsername);
users.delete('/user/:id', users_controller_1.deleteUser);
users.patch('/user/:id', users_controller_1.updateUser);
users.post('/user', users_controller_1.createUser);
users.post('/login', users_controller_1.authenticate);
exports.default = users;
