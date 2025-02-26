import { createAsyncThunk } from '@reduxjs/toolkit';
import type { VacancyType } from '../types/vacancyTypes';
import vacancyService from '../../api/vacancyService';
import { vacancyFormSchema } from '../schema/vacancyShema';

export const getVacancies = createAsyncThunk<VacancyType[]>(
  'vacancies/getVacancies',
  async () => await vacancyService.getVacancies(),
);

export const findVacancyById = createAsyncThunk('vacancies/findVacancyById', (userId: number) =>
  vacancyService.findVacancyById(userId),
);

export const createVacancy = createAsyncThunk('vacancies/createVacancy', (formData: FormData) => {
  console.log(formData);
  const data = vacancyFormSchema.parse(Object.fromEntries(formData));
  return vacancyService.createVacancy(data);
});
