export const sendResponse = (
  res,
  success,
  statusCode,
  message = "",
  data = null,
) => {
  return res.status(statusCode).json({
    statusCode: statusCode,
    success: success,
    message: message,
    data: data,
  });
};
