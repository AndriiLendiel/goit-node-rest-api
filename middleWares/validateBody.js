const {HttpError} = require ("../helpers");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if(!Object.keys(req.body).length) {
      throw HttpError(400, 'Body must have at least one field')
      }
if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;

