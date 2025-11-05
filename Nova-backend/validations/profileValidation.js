const Joi = require("joi");

const profileValidation = Joi.object({
  currentPassword: Joi.string().min(8).optional().messages({
    "string.min": "Current password must be at least 8 characters"
  }),
  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      "string.min": "New password must be at least 8 characters",
      "string.pattern.base": "New password must include uppercase, lowercase, number, and special character",
      "any.required": "New password is required"
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Confirm password must match new password",
      "any.required": "Confirm password is required"
    })
});

module.exports = profileValidation;