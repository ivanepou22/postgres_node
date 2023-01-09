import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse
} from '../../controllers/courses.controller';

const course = express.Router();

course.get('/courses', getCourses);
course.get('/course/:id', getCourse);
course.post('/course', createCourse);
course.delete('/course/:id', deleteCourse);
course.patch('/course/:id', updateCourse);

export default course;
