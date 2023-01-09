"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseHandler_1 = require("../../handlers/courseHandler");
const course = express_1.default.Router();
course.get('/courses', courseHandler_1.getCourses);
course.get('/course/:id', courseHandler_1.getCourse);
course.post('/course', courseHandler_1.createCourse);
course.delete('/course/:id', courseHandler_1.deleteCourse);
course.patch('/course/:id', courseHandler_1.updateCourse);
exports.default = course;
