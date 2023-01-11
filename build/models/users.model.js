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
exports.UserStore = void 0;
const database_provider_1 = __importDefault(require("../providers/database.provider"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = process.env.SALT_ROUNDS || '10';
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT first_name, last_name, username,created_at,updated_at FROM users';
                const result = yield database_provider_1.default.query(sql);
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get Users ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT first_name, last_name, username,created_at,updated_at FROM users WHERE id=($1)';
                const result = yield database_provider_1.default.query(sql, [id]);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find the user ${id} Error: ${err}`);
            }
        });
    }
    showByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT first_name, last_name, username,created_at,updated_at FROM users WHERE username=($1)';
                const result = yield database_provider_1.default.query(sql, [username]);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find the user ${username} Error: ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(u.password + pepper, parseInt(saltRounds));
                const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
                const result = yield database_provider_1.default.query(sql, [
                    u.first_name,
                    u.last_name,
                    u.username,
                    hashedPassword
                ]);
                const newUser = result.rows[0];
                return newUser;
            }
            catch (err) {
                throw new Error(`Could not create new user. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                const result = yield database_provider_1.default.query(sql, [id]);
                const user = result.rows[0];
                return user;
            }
            catch (err) {
                throw new Error(`Could not delete the user ${id}. Error: ${err}`);
            }
        });
    }
    update(id, u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updates = [];
                let values = [];
                if (u.first_name) {
                    updates.push(`first_name = $${values.length + 1}`);
                    values.push(u.first_name);
                }
                if (u.last_name) {
                    updates.push(`last_name = $${values.length + 1}`);
                    values.push(u.last_name);
                }
                values.push(id);
                const sql = `UPDATE users
                   SET ${updates.join(', ')}
                   WHERE id = $${values.length}
                   RETURNING *`;
                const result = yield database_provider_1.default.query(sql, values);
                const updatedUser = result.rows[0];
                return updatedUser;
            }
            catch (err) {
                console.log(err);
                throw new Error(`Could not update user ${u.id}. Error: ${err}`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const result = yield database_provider_1.default.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
        });
    }
}
exports.UserStore = UserStore;
