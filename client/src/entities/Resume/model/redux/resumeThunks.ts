import { createAsyncThunk } from '@reduxjs/toolkit';
import resumeService from '../../api/resumeService';
import { resumeFormSchema } from '../schema/resumeSchema';

export const getResumes = createAsyncThunk('resume/getResumes', () => resumeService.getResumes());

export const getResumeById = createAsyncThunk('resume/getResumeById', async (userId: number) =>
  resumeService.getResumeById(userId),
);

export const addResume = createAsyncThunk('resume/addResume', (formData: FormData) => {
  const data = resumeFormSchema.parse(Object.fromEntries(formData));
  return resumeService.addResume(data);
});

export const updateResumeStatus = createAsyncThunk(
  'resume/updateResumeStatus',
  async ({status, resumeId}: {status: string, resumeId: number}): Promise<void> => {
    await resumeService.editResumeStatus({status, resumeId});
  },
);
