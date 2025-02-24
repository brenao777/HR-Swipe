import type { AxiosInstance } from 'axios';
import axiosInstance from '@/shared/api/axiosInstance';
import { ZodError } from 'zod';
import { vacancySchema } from '../model/schema/vacancyShema';
import type { VacancyType } from '../model/types/vacancyTypes';

class VacancyService {
  constructor(private readonly client: AxiosInstance) {}

  async getVacancies(): Promise<VacancyType[]> {
    try {
      const res = await this.client.get('/vacancies');
      return vacancySchema.array().parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in getVacancies: ', err.issues);
      }
      throw err;
    }
  }

  async findVacancyById(id: string): Promise<VacancyType | null> {
    try {
      const res = await this.client.get(`/vacancies/${id}`);
      return vacancySchema.parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in findVacancyById: ', err.issues);
      }
      throw err;
    }
  }

}

export default new VacancyService(axiosInstance);
