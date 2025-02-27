import type { z } from 'zod';
import type { vacancyFormSchema, vacancySchema, vacancySearchSchema, vacancyStatusSchema } from '../schema/vacancyShema';

export type VacancyType = z.infer<typeof vacancySchema>;
export type VacancyFormType = z.infer<typeof vacancyFormSchema>;
export type VacancyWithStatusType = z.infer<typeof vacancyStatusSchema>;
export type VacancySearchType = z.infer<typeof vacancySearchSchema>



export type VacancySliceType = {
  vacancies: VacancyType[];
  vacanciesWithStatus: VacancyWithStatusType[];
  hiddenVacancies: number[];
  currentIndex: number;
  loading: boolean;
  error: string | null;
  addvacancies: VacancyType[]
};
