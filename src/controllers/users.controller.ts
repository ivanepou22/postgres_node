import { Request, Response } from 'express';
import { User, UserUpdate, UserStore } from '../models/users.model';

const store = new UserStore();

//Show all the users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

//show user by id
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

//show user by username
export const getUserByUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await store.showByUsername(req.params.username);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

//delete a course
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedUser = await store.delete(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//edit/update
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user: UserUpdate = {};
    if (req.body.first_name) {
      user.first_name = req.body.first_name;
    }
    if (req.body.last_name) {
      user.last_name = req.body.last_name;
    }
    const updatedUser = await store.update(req.params.id, user);
    res.json(updatedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//create a user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password
    };

    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
