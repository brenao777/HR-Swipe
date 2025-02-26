import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { VacancySliceType, VacancyType, VacancyWithStatusType } from '../types/vacancyTypes';
import { findVacancyById, getVacancies, getVacanciesWithStatus } from './vacancyThunk';

const initialState: VacancySliceType = {
  vacancies: [],
  hiddenVacancies: [],
  currentIndex: 0,
  loading: false,
  error: null,
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setVacancies(state, action: PayloadAction<VacancyWithStatusType[]>) {
      state.vacancies = action.payload;
    },
    applyToVacancy(state, action: PayloadAction<number>) {
      state.currentIndex += 1; // Переход к следующей вакансии
      console.log('Отклик на вакансию -', action.payload); // Здесь можно добавить API-запрос
    },
    hideVacancy(state, action: PayloadAction<number>) {
      state.hiddenVacancies.push(action.payload);
      state.currentIndex += 1; // Переход к следующей вакансии
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(getVacancies.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getVacancies.fulfilled, (state, action) => {
    //     state.vacancies = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(getVacancies.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });

    // builder
    //   .addCase(findVacancyById.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(findVacancyById.fulfilled, (state, action) => {
    //     state.vacancies = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(findVacancyById.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });

    builder
      .addCase(getVacanciesWithStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVacanciesWithStatus.fulfilled, (state, action) => {
        console.log(action.payload, '---------');
        state.vacancies = action.payload;
        state.loading = false;
      })
      .addCase(getVacanciesWithStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setVacancies, applyToVacancy, hideVacancy } = vacanciesSlice.actions;
export default vacanciesSlice;
