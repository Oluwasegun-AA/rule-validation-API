import express from 'express';
import dotenv from 'dotenv';

import { catchAllError, connectionMessage } from '../helpers';
import serverMiddleWares from '../middlewares/serverMiddlewares';

dotenv.config();
const app = express();
const { PORT = 3000 } = process.env;

serverMiddleWares(app);

catchAllError(app);

app.listen(PORT, connectionMessage(PORT));
