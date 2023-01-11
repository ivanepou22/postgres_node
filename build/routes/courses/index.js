"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courses_controller_1 = require("../../controllers/courses.controller");
const courses = express_1.default.Router();
courses.get('/courses', courses_controller_1.getCourses);
courses.get('/course/:id', courses_controller_1.getCourse);
courses.post('/course', courses_controller_1.createCourse);
courses.delete('/course/:id', courses_controller_1.deleteCourse);
courses.patch('/course/:id', courses_controller_1.updateCourse);
exports.default = courses;
