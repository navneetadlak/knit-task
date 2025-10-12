import * as yup from 'yup';

export const loginSchema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must not exceed 30 characters'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must not exceed 30 characters')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const taskSchema = yup.object({
    title: yup
        .string()
        .required('Title is required')
        .max(100, 'Title must not exceed 100 characters'),
    description: yup
        .string()
        .max(500, 'Description must not exceed 500 characters'),
    status: yup
        .string()
        .oneOf(['pending', 'in progress', 'completed'], 'Invalid status')
        .required('Status is required'),
});