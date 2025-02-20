import { z } from 'zod';

export const CompanyObjectSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    vacancyId: z.number(),
    logo: z.string(),
    location: z.string(),
});

export const CompanyArraySchema = z.array(CompanyObjectSchema);