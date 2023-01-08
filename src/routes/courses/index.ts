import express from 'express';
import {
  index,
  show,
  create,
  destroy,
  update
} from '../../handlers/courseHandler';

const course = express.Router();

course.get('/courses', index);
course.get('/course/:id', show);
course.post('/course', create);
course.delete('/course/:id', destroy);
course.patch('/course/:id', update);

export default course;
