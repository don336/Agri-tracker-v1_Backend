import express, { Request, Response } from 'express';

import cors from 'cors';
import { errors } from 'celebrate';
import connection from './db_connection/mongoose';
import routes from './routes/index';

connection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(errors());
app.use(routes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Home');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'resource not Found' });
});

export default app;
