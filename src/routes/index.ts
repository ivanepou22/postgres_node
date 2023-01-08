import express from 'express';
import course from './courses';
const routes = express.Router();

routes.use(course);

export default routes;
