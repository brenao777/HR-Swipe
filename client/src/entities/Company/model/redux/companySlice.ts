import type { CompanyState } from '../types/companyTypes';
import { createSlice } from '@reduxjs/toolkit';
import { findCompanyById, getCompany } from './companyThanks';

const initialState: CompanyState = {
  company: null,
  loading: false,
  error: null,
  myCompany: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(findCompanyById.fulfilled, (state, action) => {
        state.myCompany = action.payload;
        state.loading = false;
      })
      .addCase(findCompanyById.rejected, (state, action) => {
        state.loading = false;
        console.log('SLICE ERROR ------------>', action.payload);
        state.error = action.payload as string;
      });
  },
});

export default companySlice.reducer;
