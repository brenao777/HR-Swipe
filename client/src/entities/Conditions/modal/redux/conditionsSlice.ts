import { createSlice } from '@reduxjs/toolkit';
import { createCondition, deleteCondition, fetchConditions, updateCondition } from './conditionsThunk';
import type { ConditionsState } from '../types/conditionsType';

const initialState: ConditionsState = {
  conditions: [],
  loading: false,
  error: null,
};

const conditionsSlice = createSlice({
  name: 'conditions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConditions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchConditions.fulfilled, (state, action) => {
      state.conditions = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchConditions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(createCondition.fulfilled, (state, action) => {
      state.conditions.push(action.payload);
    })
    .addCase(updateCondition.fulfilled, (state, action) => {
      const index = state.conditions.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.conditions[index] = action.payload;
      }
    })
    .addCase(deleteCondition.fulfilled, (state, action) => {
      const id = action.meta.arg;
      state.conditions = state.conditions.filter((c) => c.id !== id);
    });
  },
});

export default conditionsSlice.reducer;
