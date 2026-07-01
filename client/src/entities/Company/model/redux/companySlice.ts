import type { CompanyState } from '../types/companyTypes';
import { createSlice } from '@reduxjs/toolkit';
import { addCompany, findCompanyById, getCompany } from './companyThanks';
import { deleteVacancy } from '@/entities/Vacancy/model/redux/vacancyThunk';

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
      .addCase(findCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findCompanyById.fulfilled, (state, action) => {
        state.myCompany = action.payload;
        state.loading = false;
      })
      .addCase(findCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCompany.fulfilled, (state, { payload }) => {
        state.company = payload;
      })
      .addCase(deleteVacancy.fulfilled, (state, action) => {
        if (state.myCompany) {
          state.myCompany.Vacancies = state.myCompany.Vacancies.filter(
            (vacancy) => vacancy.id !== action.payload,
          );
        }
      });
  },
});

export default companySlice.reducer;
