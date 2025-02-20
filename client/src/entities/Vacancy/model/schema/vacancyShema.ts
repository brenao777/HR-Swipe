import { z } from 'zod';

export const VacancyObjectSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    conditiosId: z.number(),
    location: z.string(),
})

export const VacancyArraySchema = z.array(VacancyObjectSchema);