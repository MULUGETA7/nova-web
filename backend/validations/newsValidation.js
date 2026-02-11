const Joi = require('joi');

// Define the Joi validation schema for News
const newsValidationSchema = Joi.object({
  title: Joi.string().min(5).required().messages({
    'string.min': 'Title must be at least 5 characters long',
    'any.required': 'Title is required'
  }),
  category: Joi.string().valid('Technology', 'Company News', 'Events', 'Partnership').required().messages({
    'any.required': 'Category is required',
    'any.only': 'Category must be one of [Technology, Company News, Events, Partnership]'
  }),
  content: Joi.string().min(10).required().messages({
    'string.min': 'Content must be at least 10 characters long',
    'any.required': 'Content is required'
  }),
  date: Joi.date().required().messages({
    'any.required': 'Date is required',
    'date.base': 'Date must be a valid date'
  }),
  imageUrl: Joi.string().optional().messages({
    'string.base': 'Image URL must be a string',
  }) // 🔹 Allows local file paths (e.g., "/uploads/filename.jpg")
});

// ✅ Ensure correct export
module.exports = newsValidationSchema;