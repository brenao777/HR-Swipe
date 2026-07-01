import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ResumeSliceType } from '../types/resumeTypes';
import { addResume, getResumeById, getResumes } from './resumeThunks';
// eslint-disable-next-line fsd-layers/no-import-from-top
import { findVacancyById } from '@/entities/Vacancy/model/redux/vacancyThunk';

const initialState: ResumeSliceType = {
  resumes: [],
  loading: false,
  error: null,
  resumesById: [],
  hiddenResumes: [],
  currentResumeIndex: 0,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    applyToResume(state, _action: PayloadAction<number>) {
      state.currentResumeIndex += 1;
    },
    hideResume(state, action: PayloadAction<number>) {
      state.hiddenResumes.push(action.payload);
      state.currentResumeIndex += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getResumes.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Не удалось загрузить резюме';
      })
      .addCase(getResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.resumes = action.payload;
      })
      .addCase(addResume.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.resumes.push(action.payload);
      })
      .addCase(getResumeById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.resumesById = action.payload;
      })
      // Loading a vacancy's candidates resets the HR swipe deck.
      .addCase(findVacancyById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.hiddenResumes = [];
        state.currentResumeIndex = 0;
      })
      .addCase(findVacancyById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.resumesById = action.payload;
      })
      .addCase(findVacancyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Не удалось загрузить отклики';
      });
  },
});

export const { applyToResume, hideResume } = resumeSlice.actions;
export default resumeSlice;
