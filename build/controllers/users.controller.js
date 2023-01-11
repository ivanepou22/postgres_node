"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.createUser = exports.updateUser = exports.deleteUser = exports.getUserByUsername = exports.getUserById = exports.getUsers = void 0;
const users_model_1 = require("../models/users.model");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new users_model_1.UserStore();
//Show all the users
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.getUsers = getUsers;
//show user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(req.params.id);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.getUserById = getUserById;
//show user by username
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.showByUsername(req.params.username);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.getUserByUsername = getUserByUsername;
//delete a course
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield store.delete(req.params.id);
        res.json(deletedUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.deleteUser = deleteUser;
//edit/update
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {};
        if (req.body.first_name) {
            user.first_name = req.body.first_name;
        }
        if (req.body.last_name) {
            user.last_name = req.body.last_name;
        }
        const updatedUser = yield store.update(req.params.id, user);
        res.json(updatedUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.updateUser = updateUser;
//create a user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password
        };
        const newUser = yield store.create(user);
        const payload = {
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            username: newUser.username
        };
        if (!process.env.TOKEN_SECRET) {
            res.status(500).send('Missing TOKEN_SECRET env variable');
            return;
        }
        // Generate a JWT token for the user
        const token = (0, jwt_middleware_1.generateJWT)(payload, process.env.TOKEN_SECRET);
        res.json({ token });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.createUser = createUser;
// Authenticate a user
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield store.authenticate(username, password);
        if (user) {
            if (!process.env.TOKEN_SECRET) {
                res.status(500).send('Missing TOKEN_SECRET env variable');
                return;
            }
            const payload = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username
            };
            // Generate a JWT token for the user
            const token = (0, jwt_middleware_1.generateJWT)(payload, process.env.TOKEN_SECRET);
            res.json({ token });
        }
        else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.authenticate = authenticate;
