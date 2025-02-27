import { createAsyncThunk } from '@reduxjs/toolkit';
import type { VacancyType, VacancyWithStatusType } from '../types/vacancyTypes';
import vacancyService from '../../api/vacancyService';
import { vacancyFormSchema } from '../schema/vacancyShema';

export const getVacancies = createAsyncThunk<VacancyType[], Record<string, unknown>>(
  'vacancies/getVacancies',
  async (filters) => await vacancyService.getVacancies(filters),
);

export const findVacancyById = createAsyncThunk(
  'vacancies/findVacancyById',
  async (vacancyId: number) => {
    const res = await vacancyService.findVacancyById(vacancyId);
    return res;
  },
);

export const companyVacancy = createAsyncThunk<VacancyType[]>(
  'vacancies/companyVacancy',
  async (companyId: number) => {
    const res = await vacancyService.findCompanyVacancies(companyId);
    console.log(res)
    return res;
  },
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
