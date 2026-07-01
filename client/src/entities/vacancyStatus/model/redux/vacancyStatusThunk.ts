import { createAsyncThunk } from '@reduxjs/toolkit';
import vacancyStatusService from '../../api/vacancyStatusService';

export const createResponse = createAsyncThunk(
  'response/createResponse',
  async (vacancyId: number) => {
    await vacancyStatusService.createResponse(vacancyId);
    return vacancyId;
  },
);
