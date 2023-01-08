import { Request, Response } from 'express';
import {
  Course,
  CourseUpdate,
  UdacityCourseStore
} from '../models/udacity_course';

const store = new UdacityCourseStore();

//Show all the courses
export const getCourses = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await store.index();
    res.json(courses);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//show course according to ID;
export const getCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await store.show(req.params.id);
    res.json(course);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//create a course
export const createCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const course: Course = {
      name: req.body.name,
      duration: req.body.duration,
      description: req.body.description
    };

    const newArticle = await store.create(course);
    res.json(newArticle);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//delete a course
export const deleteCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//edit/update
export const updateCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const course: CourseUpdate = {};
    if (req.body.name) {
      course.name = req.body.name;
    }
    if (req.body.duration) {
      course.duration = req.body.duration;
    }
    if (req.body.description) {
      course.description = req.body.description;
    }

    const updatedCourse = await store.update(req.params.id, course);
    res.json(updatedCourse);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
