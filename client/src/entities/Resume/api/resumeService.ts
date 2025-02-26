import type { AxiosInstance } from 'axios';
import axiosInstance from '@/shared/api/axiosInstance';
import { ZodError } from 'zod';
import { resumeSchema } from '../model/schema/resumeSchema';
import type { ResumeFormType, ResumeType } from '../model/types/resumeTypes';

class ResumeService {
  constructor(private readonly client: AxiosInstance) {}

  async getResumes(): Promise<ResumeType[]> {
    try {
      const res = await this.client.get('/resume');
      return resumeSchema.array().parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in getResumes: ', err.issues);
      }
      throw err;
    }
  }

  async getResumeById(userId: number): Promise<ResumeType[]> {
    try {
      const res = await this.client.get(`/resume/${String(userId)}`);
      return resumeSchema.array().parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in getResumeById: ', err.issues);
      }
      throw err;
    }
  }

  async addResume(resume: ResumeFormType): Promise<ResumeType> {
    try {
      const res = await this.client.post('/resume', resume, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return resumeSchema.parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in addResumes: ', err.issues);
      }
      throw err;
    }
  }

  async deleteResume(id: number): Promise<void> {
    await this.client.delete(`/resume/${id.toString()}`);
  }

  async editResumeStatus({status, resumeId}: {status: string, resumeId: number}): Promise<void> {
    try {
      await this.client.put(`/resume/${resumeId.toString()}`, {status});
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in addResumes: ', err.issues);
      }
      throw err;
    }
  }
}

export default new ResumeService(axiosInstance);
