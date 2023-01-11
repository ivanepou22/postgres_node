import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface Payload {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
}

function generateJWT(payload: Payload, secret: string): string {
  return jwt.sign(payload, secret);
}

const verifyJWTToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).send('Authorization header is missing');
      return;
    }
    const token = authorizationHeader.split(' ')[1];
    if (!process.env.TOKEN_SECRET) {
      res.status(500).send('Missing TOKEN_SECRET env variable');
      return;
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};

export { verifyJWTToken, generateJWT };
