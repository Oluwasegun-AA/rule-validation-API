import express from 'express';
import dotenv from 'dotenv';

import { connectionMessage } from '../helpers';

dotenv.config();
const app = express();
const { PORT = 3000 } = process.env;

app.listen(PORT, connectionMessage(PORT));
