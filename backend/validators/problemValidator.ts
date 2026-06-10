import { z } from 'zod';

export const addProblemSchema = z.object({
    title: z.string()
        .min(1,   'Title is required')
        .max(200, 'Title too long'),

    level: z.enum(['Easy', 'Medium', 'Hard'], {
        message: 'Level must be Easy, Medium or Hard'  
    }),

    leetCodeLink: z.string()
        .url('Invalid URL')
        .optional()
        .or(z.literal('')),

    youtubeLink: z.string()
        .url('Invalid URL')
        .optional()
        .or(z.literal('')),

    articleLink: z.string()
        .url('Invalid URL')
        .optional()
        .or(z.literal('')),
});

export const updateProblemSchema = addProblemSchema.partial();