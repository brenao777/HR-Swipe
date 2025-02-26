import { createAsyncThunk } from '@reduxjs/toolkit';
import type { VacancyType, VacancyWithStatusType } from '../types/vacancyTypes';
import vacancyService from '../../api/vacancyService';
import { vacancyFormSchema } from '../schema/vacancyShema';

export const getVacancies = createAsyncThunk<VacancyType[], Record<string, unknown>>(
  'vacancies/getVacancies',
  async (filters) => await vacancyService.getVacancies(filters),
);

export const findVacancyById = createAsyncThunk('vacancies/findVacancyById', (userId: number) =>
  vacancyService.findVacancyById(userId),
);

export const createVacancy = createAsyncThunk(
  'vacancies/createVacancy',
  async ({ formData, companyId }: { formData: FormData; companyId: number }) => {
    const data = vacancyFormSchema.parse(Object.fromEntries(formData));
    console.log('Parsed Data:', data); // Логируем распарсенные данные
    return vacancyService.createVacancy({ ...data, companyId });
  }
);

export const getVacanciesWithStatus = createAsyncThunk<VacancyWithStatusType[]>(
  'vacancies/getVacanciesWithStatus',
  async () => await vacancyService.getVacanciesWithStatus(),
);
