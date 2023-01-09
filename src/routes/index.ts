import express from 'express';
import users from './users';
import courses from './courses/index';

const routes = express.Router();

routes.use(courses);
routes.use(users);
export default routes;
