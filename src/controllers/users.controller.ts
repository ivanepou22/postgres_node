import { Request, Response } from 'express';
import { User, UserUpdate, UserStore } from '../models/users.model';

const store = new UserStore();
