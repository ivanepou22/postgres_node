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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourse = exports.deleteCourse = exports.createCourse = exports.getCourse = exports.getCourses = void 0;
const udacity_course_1 = require("../models/udacity_course");
const store = new udacity_course_1.UdacityCourseStore();
//Show all the courses
const getCourses = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield store.index();
        res.json(courses);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.getCourses = getCourses;
//show course according to ID;
const getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield store.show(req.params.id);
        res.json(course);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.getCourse = getCourse;
//create a course
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = {
            name: req.body.name,
            duration: req.body.duration,
            description: req.body.description
        };
        const newArticle = yield store.create(course);
        res.json(newArticle);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.createCourse = createCourse;
//delete a course
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield store.delete(req.params.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.deleteCourse = deleteCourse;
//edit/update
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = {};
        if (req.body.name) {
            course.name = req.body.name;
        }
        if (req.body.duration) {
            course.duration = req.body.duration;
        }
        if (req.body.description) {
            course.description = req.body.description;
        }
        const updatedCourse = yield store.update(req.params.id, course);
        res.json(updatedCourse);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.updateCourse = updateCourse;
