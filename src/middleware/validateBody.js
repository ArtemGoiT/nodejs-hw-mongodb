import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateBody(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      error: err.details,
    });
    next(error);
  }
};
