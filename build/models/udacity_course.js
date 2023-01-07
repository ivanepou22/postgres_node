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
exports.UdacityCourseStore = void 0;
const database_1 = __importDefault(require("../database"));
class UdacityCourseStore {
    //read from database
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM udacity_courses';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Cannot get Courses ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM udacity_courses WHERE course_id=($1)';
                // @ts-ignore
                const conn = yield Client.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find course ${id}. Error: ${err}`);
            }
        });
    }
    create(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO udacity_courses (name, duration, description) VALUES($1, $2, $3) RETURNING *';
                // @ts-ignore
                const conn = yield Client.connect();
                const result = yield conn.query(sql, [c.name, c.duration, c.description]);
                const course = result.rows[0];
                conn.release();
                return course;
            }
            catch (err) {
                throw new Error(`Could not add new course ${c.name}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM udacity_courses WHERE course_id=($1)';
                // @ts-ignore
                const conn = yield Client.connect();
                const result = yield conn.query(sql, [id]);
                const course = result.rows[0];
                conn.release();
                return course;
            }
            catch (err) {
                throw new Error(`Could not delete course ${id}. Error: ${err}`);
            }
        });
    }
}
exports.UdacityCourseStore = UdacityCourseStore;
