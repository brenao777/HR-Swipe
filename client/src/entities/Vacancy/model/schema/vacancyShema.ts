import { z } from 'zod';

export const vacancySchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    conditionsId: z.number(),
    location: z.string(),
    companyId: z.number(),
})

export const VacancyArraySchema = z.array(vacancySchema);