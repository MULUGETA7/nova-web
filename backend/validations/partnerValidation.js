const Joi = require("joi");

const partnerValidationSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Name must be at least 2 characters long",
    "any.required": "Name is required",
  }),
  description: Joi.string().min(10).required().messages({
    "string.min": "Description must be at least 10 characters long",
    "any.required": "Description is required",
  }),
});

module.exports = partnerValidationSchema;
