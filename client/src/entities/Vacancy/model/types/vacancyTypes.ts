import type { z } from 'zod';
import type { VacancyArraySchema, VacancyObjectSchema } from '../schema/vacancyShema';

export type VacancyArrayType = z.infer <typeof VacancyArraySchema>
export type VacancyObjectType = z.infer<typeof VacancyObjectSchema>