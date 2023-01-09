import express from 'express';
import {
  getUsers,
  getUserById,
  getUserByUsername,
  deleteUser,
  updateUser,
  createUser
} from '../../controllers/users.controller';

const users = express.Router();

users.get('/users', getUsers);
users.get('/user/:id', getUserById);
users.get('/user/:username', getUserByUsername);
users.delete('/user/:id', deleteUser);
users.patch('/user/:id', updateUser);
users.post('/user', createUser);

export default users;
