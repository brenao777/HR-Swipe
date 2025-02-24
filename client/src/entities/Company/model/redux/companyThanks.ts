import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CompanyArrayType } from "../types/companyTypes";
import { CompanyArraySchema } from "../schema/companyShema";
import axiosInstance from "@/shared/api/axiosInstance";





export const getCompany = createAsyncThunk('getCompany/company', async (_, { rejectWithValue }) => {
    try {
      const {data} = await axiosInstance.get<CompanyArrayType[]>('/company');
      return CompanyArraySchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'POLOMALOSY');
    }
  });

