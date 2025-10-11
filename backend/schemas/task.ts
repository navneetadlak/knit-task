import Joi from 'joi';

export const taskSchema = Joi.object({
    title: Joi.string()
        .trim()
        .max(100)
        .required()
        .messages({
            'string.max': 'Title cannot exceed 100 characters',
            'any.required': 'Title is required'
        }),
    description: Joi.string()
        .trim()
        .max(500)
        .allow('')
        .optional()
        .messages({
            'string.max': 'Description cannot exceed 500 characters'
        }),
    status: Joi.string()
        .valid('pending', 'in progress', 'completed')
        .default('pending')
});

export const taskUpdateSchema = Joi.object({
    title: Joi.string()
        .trim()
        .max(100)
        .optional(),
    description: Joi.string()
        .trim()
        .max(500)
        .allow('')
        .optional(),
    status: Joi.string()
        .valid('pending', 'in progress', 'completed')
        .optional()
}).min(1); 