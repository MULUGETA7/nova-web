const Joi = require("joi");

const hackathonValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Event title is required",
  }),
  eventDate: Joi.date().required().messages({
    "any.required": "Event date is required",
  }),
  type: Joi.string().valid("image", "stat").default("image"),
  images: Joi.array().items(Joi.string()).when("type", {
    is: "image",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }).messages({
    "any.required": "At least one image is required for visual assets",
  }),
  metric: Joi.string().allow("").optional(),
  subtext: Joi.string().allow("").optional(),
});

module.exports = hackathonValidationSchema;
