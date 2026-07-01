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
  openModal: false,
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    applyToVacancy(state, _action: PayloadAction<number>) {
      state.currentIndex += 1;
    },
    hideVacancy(state, action: PayloadAction<number>) {
      state.hiddenVacancies.push(action.payload);
      state.currentIndex += 1;
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
        state.hiddenVacancies = [];
        state.currentIndex = 0;
        state.loading = false;
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Не удалось загрузить вакансии';
      });

    builder
      .addCase(getVacanciesWithStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVacanciesWithStatus.fulfilled, (state, action) => {
        state.vacanciesWithStatus = action.payload;
        state.loading = false;
      })
      .addCase(getVacanciesWithStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Не удалось загрузить отклики';
      });

    builder
      .addCase(createVacancy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVacancy.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createVacancy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Не удалось создать вакансию';
      });
  },
});

export const { handleShow, applyToVacancy, hideVacancy } = vacanciesSlice.actions;
export default vacanciesSlice;
