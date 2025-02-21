import type { z } from 'zod';
import type { VacancyArraySchema, vacancySchema } from '../schema/vacancyShema';

export type VacancyArrayType = z.infer<typeof VacancyArraySchema>;
export type VacancyType = z.infer<typeof vacancySchema>;

export type VacancySliceType = {
  vacancies: VacancyType[];
  hiddenVacancies: number[];
  currentIndex: number;
  loading: boolean;
  error: string | null;
};
