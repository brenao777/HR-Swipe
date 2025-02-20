// import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ResumeSliceType } from '../types/resumeTypes';
import { getResumes } from './resumeThunks';

const initialState: ResumeSliceType = {
  resumes: [],
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // setSelected: (state, action: PayloadAction<boolean>) => {

    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResumes.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getResumes.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload as string;
      })
      .addCase(getResumes.fulfilled, (state, action) => {
        state.loading = true;
        state.error = null;
        state.resumes = action.payload;
      });
  },
});

export default resumeSlice;
