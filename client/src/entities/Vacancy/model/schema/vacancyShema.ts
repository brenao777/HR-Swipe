import { z } from 'zod';

export const vacancySchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    location: z.string(),
    companyId: z.number(),
    experience: z.string(),
    format: z.enum(['Удаленно', 'Гибрид', 'Офис']),
    schedule: z.enum(['Полная', 'Частичная', 'Проектная']),
    from: z.number(),
    before: z.number(),
})
