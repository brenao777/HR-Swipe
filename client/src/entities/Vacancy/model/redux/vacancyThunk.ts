import { createAsyncThunk } from '@reduxjs/toolkit';
import type { VacancyType } from '../types/vacancyTypes';
import vacancyService from '../../api/vacancyService';

export const getVacancies = createAsyncThunk<VacancyType[]>(
  'vacancies/getVacancies',
  async () => await vacancyService.getVacancies(),
);

export const findVacancyById = createAsyncThunk('vacancies/findVacancyById', (userId: number) =>
  vacancyService.findVacancyById(userId),
);
