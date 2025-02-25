import type { z } from 'zod';
import type { vacancyStatusSchema } from '../schema/schema';

export type VacancyStatusType = z.infer<typeof vacancyStatusSchema>;
