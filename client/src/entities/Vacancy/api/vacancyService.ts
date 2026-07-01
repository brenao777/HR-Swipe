import type { AxiosInstance } from 'axios';
import axiosInstance from '@/shared/api/axiosInstance';
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

  async getVacancies(filters: Record<string, unknown> = {}): Promise<VacancyType[]> {
    // Keep only non-empty filters so we don't send `?title=&from=` to the API.
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    }
    const res = await this.client.get(`/vacancies?${params.toString()}`);
    return vacancySchema.array().parse(res.data);
  }

  async deleteVacancy(vacancyId: number): Promise<void> {
    await this.client.delete(`/vacancies/${vacancyId.toString()}`);
  }

  // Candidates (resumes) that responded to a given vacancy.
  async findVacancyById(vacancyId: number): Promise<ResumeType[]> {
    const res = await this.client.get(`/vacancies/${String(vacancyId)}`);
    return resumeSchema.array().parse(res.data);
  }

  async createVacancy(newVacancy: VacancyFormType & { companyId: number }): Promise<VacancyType> {
    const res = await this.client.post('/vacancies', newVacancy);
    return vacancySchema.parse(res.data);
  }

  async getVacanciesWithStatus(): Promise<VacancyWithStatusType[]> {
    const res = await this.client.get('/status');
    return vacancyStatusSchema.array().parse(res.data);
  }
}

export default new VacancyService(axiosInstance);
