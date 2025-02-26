import type { z } from 'zod';
import type { vacancySchema, vacancyStatusSchema } from '../schema/vacancyShema';

export type VacancyType = z.infer<typeof vacancySchema>;
export type VacancyWithStatusType = z.infer<typeof vacancyStatusSchema>;

export type VacancySliceType = {
  vacancies: VacancyWithStatusType[];
  hiddenVacancies: number[];
  currentIndex: number;
  loading: boolean;
  error: string | null;
};
