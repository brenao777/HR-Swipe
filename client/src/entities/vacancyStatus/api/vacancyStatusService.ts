import axiosInstance from '@/shared/api/axiosInstance';
import type { AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import { vacancyStatusSchema } from '../model/schema/schema';
import type { VacancyStatusType } from '../model/types/types';

class VacancyStatusService {
  constructor(private readonly client: AxiosInstance) {}

  async createResponse(vacancyId: number): Promise<VacancyStatusType> {
    try {
      const res = await this.client.post(`/response/${vacancyId.toString()}`, {vacancyId});
      return vacancyStatusSchema.parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in getVacancies: ', err.issues);
      }
      throw err;
    }
  }
}

export default new VacancyStatusService(axiosInstance);
