import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config();

const app: express.Application = express();

//configure cors
const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

//port
const { PORT } = process.env;

//routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Node Js Server');
});

app.use('/api/v1', routes);

app.get(
  '/test-cors',
  cors(corsOptions),
  (req: Request, res: Response, next: express.NextFunction) => {
    res.json({ msg: 'This cors is enabled with a middle ware' });
  }
);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

export default app;
