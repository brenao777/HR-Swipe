import { z } from 'zod';

export const ConditionsObjectSchema = z.object({
    id: z.number(),
    experience: z.string(),
    from: z.number(),
    before: z.number(),
    format: z.enum(['Удаленно', 'Офис', 'Гибрид']),
    schedule: z.enum(['Полная', 'Частичная', 'Проектная']),
});

export const ConditionsArraySchema = z.array(ConditionsObjectSchema);