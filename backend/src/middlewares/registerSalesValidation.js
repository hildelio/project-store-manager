const { salesSchema } = require('./joiSchema');

function registerSalesValidation(req, res, next) {
  const { body } = req;
  const { error } = salesSchema.validate(body);

  if (error) {
    const { context: { limit, label }, message } = error.details[0];
    const status = limit === 1 ? 422 : 400;

    if (label === 'quantity') {
      return res.status(status).json({ message });
    }
    return res.status(400).json({ message });
  }
  next();
}

module.exports = registerSalesValidation;