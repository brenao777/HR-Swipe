import { createAsyncThunk } from '@reduxjs/toolkit';
import vacancyStatusService from '../../api/vacancyStatusService';

export const createResponse = createAsyncThunk(
  'response/createResponse',
  async (vacancyId: number) => {
    const res = await vacancyStatusService.createResponse(vacancyId);
    console.log('POST VACATION-STATUS-THUNK', res);
  },
);
