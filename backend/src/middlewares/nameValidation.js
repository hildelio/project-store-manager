const { productsSchema } = require('./joiSchema');

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  const result = productsSchema.validate({ name });
  const { error } = result;
  if (!name) {
    return res.status(400).json({ message: error.message });
  }
  if (error) {
    return res.status(422).json({ message: error.message });
  }
  next();
};

module.exports = nameValidation;