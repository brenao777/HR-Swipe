import type { AxiosInstance } from 'axios';
import axiosInstance from '@/shared/api/axiosInstance';
import { resumeSchema } from '../model/schema/resumeSchema';
import type { ResumeFormType, ResumeType } from '../model/types/resumeTypes';

type EditStatusPayload = { status: string; resumeId: number; vacancyId: number };

class ResumeService {
  constructor(private readonly client: AxiosInstance) {}

  async getResumes(): Promise<ResumeType[]> {
    const res = await this.client.get('/resume');
    return resumeSchema.array().parse(res.data);
  }

  async getResumeById(userId: number): Promise<ResumeType[]> {
    const res = await this.client.get(`/resume/${String(userId)}`);
    return resumeSchema.array().parse(res.data);
  }

  async addResume(resume: ResumeFormType): Promise<ResumeType> {
    const res = await this.client.post('/resume', resume, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return resumeSchema.parse(res.data);
  }

  async deleteResume(id: number): Promise<void> {
    await this.client.delete(`/resume/${id.toString()}`);
  }

  async editResumeStatus({ status, resumeId, vacancyId }: EditStatusPayload): Promise<void> {
    await this.client.put(`/status/${resumeId.toString()}`, { status, vacancyId });
  }
}

export default new ResumeService(axiosInstance);
