import express from 'express';
import dotenv from 'dotenv';

import {
  status,
  statusCodes,
  statusMessages,
  responseHandler,
} from '../helpers';

dotenv.config();
const router = express.Router();
const { success, badRequest } = statusCodes;
const { BASE_URL = '/' } = process.env;

router.use('/', ({ method, originalUrl }, res) =>
  (BASE_URL.includes(originalUrl)
    ? responseHandler(res, {
      code: success,
      status: status.success,
      message: statusMessages.home,
      data: {
        name: 'Adepooju oluwasegun',
        github: '@oluwasegun-aa',
        email: 'oluwasegunadepoju@gmail.com',
        mobile: '08067623101',
        twitter: '@oluwaseguun_aa'
      }
    })
    : responseHandler(res, {
      code: badRequest,
      status: status.error,
      message: `The requuest ${method} ${originalUrl} is invalid.`,
    })));

export default router;
