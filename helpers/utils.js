import {
  status,
  statusCodes,
} from './status';

import responseHandler from './responseHandler';

const { badRequest } = statusCodes;

const log = string => {
  process.stdout.write(`${string}\n`);
};

const connectionMessage = port => {
  log(`Server started on port ${port}`);
};

const catchAllError = app =>
  app.use('*', ({ method, originalUrl }, res) => responseHandler(res, {
    code: badRequest,
    status: status.error,
    message: `The request ${method} ${originalUrl} is invalid.`,
  }));

export {
  log,
  connectionMessage,
  catchAllError,
};
