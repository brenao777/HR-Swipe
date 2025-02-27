import type { AxiosInstance } from 'axios';
import axiosInstance from '@/shared/api/axiosInstance';
import { ZodError } from 'zod';
import { vacancySchema, vacancyStatusSchema } from '../model/schema/vacancyShema';
import type {
  VacancyFormType,
  VacancyType,
  VacancyWithStatusType,
} from '../model/types/vacancyTypes';
import { resumeSchema } from '@/entities/Resume/model/schema/resumeSchema';
import type { ResumeType } from '@/entities/Resume/model/types/resumeTypes';

class VacancyService {
  constructor(private readonly client: AxiosInstance) {}

  async getVacancies(filters: Record<string, any> = {}): Promise<VacancyType[]> {
    try {
      const queryString = new URLSearchParams(filters).toString(); // Преобразуем объект в строку запроса
      const res = await this.client.get(`/vacancies?${queryString}`);
      return vacancySchema.array().parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in getVacancies: ', err.issues);
      }
      throw err;
    }
  }

  async findCompanyVacancies(vacancyId: number): Promise<VacancyType[]> {
    try {
      const res = await this.client.get(`/vacancies/${vacancyId.toString()}`);
      return vacancySchema.array().parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in getVacancies: ', err.issues);
      }
      throw err;
    }
  }

  async findVacancyById(vacancyId: number): Promise<ResumeType[]> {
    try {
      const res = await this.client.get(`/vacancies/${String(vacancyId)}`);
      console.log('findVacancyById------->', res.data);
      return resumeSchema.array().parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in findVacancyById: ', err.issues);
      }
      throw err;
    }
  }

  async createVacancy(newVacancy: VacancyFormType & { companyId: number }): Promise<VacancyType> {
    try {
      const res = await this.client.post('/vacancies', newVacancy);
      return vacancySchema.parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in createVacancy: ', err.issues);
      }
      throw err;
    }
  }

  async getVacanciesWithStatus(): Promise<VacancyWithStatusType[]> {
    try {
      const res = await this.client.get('/status');
      return vacancyStatusSchema.array().parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in getVacancies: ', err.issues);
      }
      throw err;
    }
  }
}

export default new VacancyService(axiosInstance);
