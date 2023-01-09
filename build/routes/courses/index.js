"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courses_controller_1 = require("../../controllers/courses.controller");
const course = express_1.default.Router();
course.get('/courses', courses_controller_1.getCourses);
course.get('/course/:id', courses_controller_1.getCourse);
course.post('/course', courses_controller_1.createCourse);
course.delete('/course/:id', courses_controller_1.deleteCourse);
course.patch('/course/:id', courses_controller_1.updateCourse);
exports.default = course;
