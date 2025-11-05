const Joi = require("joi");

const portfolioValidationSchema = Joi.object({
  images: Joi.array().items(Joi.string()).min(1).messages({
    "array.min": "At least one image is required",
  }),
});

module.exports = portfolioValidationSchema;
