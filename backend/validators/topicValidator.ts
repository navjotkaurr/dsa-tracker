import { z } from 'zod';

export const createTopicSchema = z.object({
    topicName: z.string()
    .min(1, 'Topic name is required')
    .max(100, 'Topic name too long')
})