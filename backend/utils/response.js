export function successResponse(res, statusCode, message, data = null) {
  return res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
}

export function errorResponse(res, statusCode, message, error = null) {
  return res.status(statusCode).json({
    statusCode,
    message,
    error,
  });
}
