import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { VacancySliceType } from '../types/vacancyTypes';
import { createVacancy, getVacancies, getVacanciesWithStatus } from './vacancyThunk';

const initialState: VacancySliceType = {
  vacancies: [],
  vacanciesWithStatus: [],
  hiddenVacancies: [],
  currentIndex: 0,
  loading: false,
  error: null,
  addvacancies: [],
  openModal: false,
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    applyToVacancy(state, action: PayloadAction<number>) {
      state.currentIndex += 1; // Переход к следующей вакансии
      console.log('Отклик на вакансию -', action.payload);
    },
    hideVacancy(state, action: PayloadAction<number>) {
      state.hiddenVacancies.push(action.payload);
      state.currentIndex += 1; // Переход к следующей вакансии
    },
    filterButton(state, action: PayloadAction<boolean>) {
      state.openModal = action.payload;
    },
    handleShow(state) {
      state.openModal = !state.openModal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.vacancies = action.payload;
        state.loading = false;
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getVacanciesWithStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVacanciesWithStatus.fulfilled, (state, action) => {
        console.log(action.payload, '---------');
        state.vacanciesWithStatus = action.payload;
        state.loading = false;
      })
      .addCase(getVacanciesWithStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(createVacancy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVacancy.fulfilled, (state, action) => {
        console.log(action.payload, '---------'); // Здесь можно добавить API-запрос
        // state.vacancies.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createVacancy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { handleShow, applyToVacancy, hideVacancy } = vacanciesSlice.actions;
export default vacanciesSlice;
