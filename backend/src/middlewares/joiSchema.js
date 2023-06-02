const Joi = require('joi');

const productsSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const salesItemSchema = Joi.object({
  productId: Joi.number().integer().required().label('productId'),
  quantity: Joi.number().integer().min(1).required()
.label('quantity'),
}).messages({ 
  'any.required': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to 1',
});
const salesSchema = Joi.array().items(salesItemSchema);

module.exports = { productsSchema, salesSchema };