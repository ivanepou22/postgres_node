import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse
} from '../../controllers/courses.controller';

const courses = express.Router();

courses.get('/courses', getCourses);
courses.get('/course/:id', getCourse);
courses.post('/course', createCourse);
courses.delete('/course/:id', deleteCourse);
courses.patch('/course/:id', updateCourse);

export default courses;
