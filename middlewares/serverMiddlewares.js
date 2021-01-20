import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from '../routes';

const serverMiddleWares = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger('common'));
  app.use('/', router);
};

export default serverMiddleWares;
