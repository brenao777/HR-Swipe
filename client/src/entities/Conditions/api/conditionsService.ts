import axiosInstance from '@/shared/api/axiosInstance';
import { ZodError } from 'zod';
import type { ConditionsArrayType, ConditionsObjectType } from '../modal/types/conditionsType';
import { ConditionsArraySchema, ConditionsObjectSchema } from '../modal/schema/conditionsSchema';

class ConditionsService {
  constructor(private readonly client: typeof axiosInstance) {}

  async getConditions(): Promise<ConditionsArrayType> {
    try {
      const res = await this.client.get('/conditions');
      return ConditionsArraySchema.parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.error('Validation error in getConditions:', err.issues);
      }
      throw err;
    }
  }

  async createCondition(
    condition: Omit<ConditionsObjectType, 'id'>,
  ): Promise<ConditionsObjectType> {
    try {
      const res = await this.client.post('/conditions', condition);
      return ConditionsObjectSchema.parse(res.data);
    } catch (err) {
      console.error('Error creating condition:', err);
      throw err;
    }
  }

  async updateCondition(
    id: number,
    updates: Partial<ConditionsObjectType>,
  ): Promise<ConditionsObjectType> {
    try {
      const res = await this.client.put(`/conditions/${String(id)}`, updates);
      return ConditionsObjectSchema.parse(res.data);
    } catch (err) {
      console.error('Error updating condition:', err);
      throw err;
    }
  }

  async deleteCondition(id: number): Promise<void> {
    try {
      await this.client.delete(`/conditions/${String(id)}`);
    } catch (err) {
      console.error('Error deleting condition:', err);
      throw err;
    }
  }
}

export default new ConditionsService(axiosInstance);
