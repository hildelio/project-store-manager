const { HTTP_STATUS } = require('../utils/httpStatus');
const { salesSchema } = require('./joiSchema');

function registerSalesValidation(req, res, next) {
  const { body } = req;
  const { error } = salesSchema.validate(body);
  if (!error) return next();
  
  const { context: { limit, label }, message } = error.details[0];
  const type = limit === 1 ? HTTP_STATUS.UNPROCESSABLE_ENTITY : HTTP_STATUS.BAD_REQUEST;
  
  const status = label === 'quantity' ? type : HTTP_STATUS.BAD_REQUEST;
  return res.status(status).json({ message });
}

module.exports = registerSalesValidation;