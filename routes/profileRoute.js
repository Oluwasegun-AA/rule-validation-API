import express from 'express';
import {
  status,
  statusCodes,
  statusMessages,
  responseHandler,
} from '../helpers';

const { success } = statusCodes;
const profile = express.Router();

profile.get('/', (req, res) => responseHandler(res, {
  code: success,
  status: status.success,
  message: statusMessages.home,
  data: {
    name: 'Adepoju oluwasegun',
    github: '@oluwasegun-aa',
    email: 'oluwasegunadepoju@gmail.com',
    mobile: '08067623101',
    twitter: '@oluwaseguun_aa'
  }
}));

export default profile;
