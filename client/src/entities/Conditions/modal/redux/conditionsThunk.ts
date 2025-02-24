import { createAsyncThunk } from '@reduxjs/toolkit';
import conditionsService from '../../api/conditionsService';
import type { ConditionsArrayType, ConditionsObjectType } from '../types/conditionsType';

export const fetchConditions = createAsyncThunk<ConditionsArrayType>(
  'conditions/fetchConditions',
  async () => {
    const response = await conditionsService.getConditions();
    return response;
  },
);
export const createCondition = createAsyncThunk<
  ConditionsObjectType,
  Omit<ConditionsObjectType, 'id'>
>('conditions/createCondition', async (condition) => {
  const response = await conditionsService.createCondition(condition);
  return response;
});

export const updateCondition = createAsyncThunk<
  ConditionsObjectType,
  { id: number; updates: Partial<ConditionsObjectType> }
>('conditions/updateCondition', async ({ id, updates }) => {
  const response = await conditionsService.updateCondition(id, updates);
  return response;
});

export const deleteCondition = createAsyncThunk(
  'conditions/deleteCondition',
  async (id:number) => {
    await conditionsService.deleteCondition(id);
  },
);
