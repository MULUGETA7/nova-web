const Joi = require("joi");

const portfolioValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  category: Joi.string().required().messages({
    "any.required": "Category is required",
  }),
  description: Joi.string().allow('').optional(),
  url: Joi.string().allow('').optional(),
  column: Joi.string().valid('left', 'middle', 'right').default('middle'),
  images: Joi.array().items(Joi.string()).min(1).messages({
    "array.min": "At least one image is required",
  }),
});

module.exports = portfolioValidationSchema;
