const responseHandler = (res, {
  code, message, status, data = null
}) =>
  res.status(code).json({
    message,
    status,
    data,
  });

export default responseHandler;
