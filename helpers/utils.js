import { statusCodes } from './status';

const log = string => {
  process.stdout.write(`${string}\n`);
};

const connectionMessage = port => {
  log(`Server started on port ${port}`);
};

const catchAllError = app =>
  app.use('*', ({ method, originalUrl }, res) =>
    res.status(404).send({
      status: statusCodes.badRequest,
      message: `route ${method} ${originalUrl} is not a valid`,
    }));

export {
  log,
  connectionMessage,
  catchAllError,
};
