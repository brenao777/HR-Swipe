import { createAsyncThunk } from '@reduxjs/toolkit';
import { CompanyObjectSchema, companySchemaById } from '../schema/companyShema';
import axiosInstance from '@/shared/api/axiosInstance';
import type { CompanyObjectType } from '../types/companyTypes';

export const getCompany = createAsyncThunk('company/getCompany', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/company');
    return CompanyObjectSchema.parse(res.data);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Не удалось загрузить компанию');
  }
});

export const findCompanyById = createAsyncThunk(
  'company/findCompanyById',
  async (userId: number) => {
    if (!userId) throw new Error('userId is required in findCompanyById');
    const res = await axiosInstance.get(`/company/${userId.toString()}`);
    return companySchemaById.parse(res.data);
  },
);

export const addCompany = createAsyncThunk<CompanyObjectType, FormData, { rejectValue: string }>(
  'company/addCompany',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/company', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return CompanyObjectSchema.parse(res.data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Не удалось создать компанию');
    }
  },
);
