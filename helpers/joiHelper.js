import responseHandler from './responseHandler';
import { status, statusCodes } from './status';

const extractJoiErrorMessage = error => error.details[0].message.replace(/"/g, '');

const joiValidateHelper = async (req, res, next, schema) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    const message = extractJoiErrorMessage(err);
    return responseHandler(
      res,
      {
        code: statusCodes.badRequest,
        status: status.error,
        message,
      }
    );
  }
};

export { joiValidateHelper, extractJoiErrorMessage };
