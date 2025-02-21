import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CompanyArrayType } from "../types/companyTypes";
import { CompanyArraySchema } from "../schema/companyShema";





export const getCompany = createAsyncThunk('getCompany/company', async (_, { rejectWithValue }) => {
    try {
      const {data} = await axios.get<CompanyArrayType[]>('/api/company');
      return CompanyArraySchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'POLOMALOSY');
    }
  });

