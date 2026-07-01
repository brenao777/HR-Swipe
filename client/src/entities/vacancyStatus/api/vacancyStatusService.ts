import axiosInstance from '@/shared/api/axiosInstance';
import type { AxiosInstance } from 'axios';
import { vacancyStatusSchema } from '../model/schema/schema';
import type { VacancyStatusType } from '../model/types/types';

class VacancyStatusService {
  constructor(private readonly client: AxiosInstance) {}

  async createResponse(vacancyId: number): Promise<VacancyStatusType> {
    const res = await this.client.post(`/response/${vacancyId.toString()}`, { vacancyId });
    return vacancyStatusSchema.parse(res.data);
  }
}

export default new VacancyStatusService(axiosInstance);
