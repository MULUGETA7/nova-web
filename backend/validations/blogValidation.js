// validations/blogValidation.js
const Joi = require('joi');

// Define the Joi validation schema for the Blog
const blogValidationSchema = Joi.object({
    title: Joi.string().min(5).required().messages({
        'string.min': 'Title must be at least 5 characters long',
        'any.required': 'Title is required'
    }),
    content: Joi.string().min(10).required().messages({
        'string.min': 'Content must be at least 10 characters long',
        'any.required': 'Content is required'
    }),
    author: Joi.string().required().messages({
        'any.required': 'Author is required'
    }),
    tags: Joi.array().items(Joi.string()).default([]),
});

module.exports = blogValidationSchema;
