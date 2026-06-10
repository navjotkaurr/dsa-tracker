import { optional, z } from 'zod';

export const registerSchema = z.object({
    name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too long'),

    email: z.string()
    .email('Invalid email format'),

    password: z.string()
    .min(6, 'Password must be atleast 6 characters')
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/,
            'Password must contain at least one letter and one number')
});

export const loginSchema = z.object({
    email: z.string()
    .email('Invalid email format'),

    password: z.string()
    .min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
    name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too lomg')
    .optional(),

    email: z.string()
    .email('Invalid email format')
    .optional(),

    password: z.string()
    .min(6, 'password must be atleast 6 character')
    .optional()
})