import { createAsyncThunk } from '@reduxjs/toolkit';
import { CompanyObjectSchema, companySchemaById } from '../schema/companyShema';
import axiosInstance from '@/shared/api/axiosInstance';
import { ZodError } from 'zod';

export const getCompany = createAsyncThunk('getCompany/company', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/company');
    return CompanyObjectSchema.parse(res.data);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'POLOMALOSY');
  }
});

export const findCompanyById = createAsyncThunk(
  'company/findCompanyById',
  async (userId: number) => {
    try {
      if (!userId) throw new Error('userId is undefined in findCompanyById');
      const res = await axiosInstance.get(`/company/${userId.toString()}`);
      console.log('Response from server:', res.data);
      return companySchemaById.parse(res.data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in findCompanyById: ', err.issues);
      }
      throw err;
    }
  },
);
