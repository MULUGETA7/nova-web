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
  category: Joi.string().allow('', null),
  subtitle: Joi.string().allow('', null),
  linkedinUrl: Joi.string().uri().allow('', null),
  instagramUrl: Joi.string().uri().allow('', null),
  buttonText: Joi.string().allow('', null),
  buttonUrl: Joi.string().allow('', null),
  bgColor: Joi.string().allow('', null),
}).unknown();

module.exports = partnerValidationSchema;
