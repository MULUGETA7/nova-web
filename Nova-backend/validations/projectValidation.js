// validations/projectValidation.js
const Joi = require('joi');

// Define the Joi validation schema for the Project
const projectValidationSchema = Joi.object({
    title: Joi.string().min(5).required().messages({
        'string.min': 'Title must be at least 5 characters long',
        'any.required': 'Title is required'
    }),
    description: Joi.string().min(10).required().messages({
        'string.min': 'Description must be at least 10 characters long',
        'any.required': 'Description is required'
    }),
    tags: Joi.array().items(Joi.string()).default([]),
    files: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().valid('active', 'inactive').required().messages({
        'any.required': 'Status is required',
        'any.only': 'Status must be either "active" or "inactive"'
    }),
});

module.exports = projectValidationSchema;
