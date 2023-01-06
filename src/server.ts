import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();

//port
const { PORT } = process.env;

//routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Express');
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

export default app;
