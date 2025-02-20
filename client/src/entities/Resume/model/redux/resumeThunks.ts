import { createAsyncThunk } from '@reduxjs/toolkit';
import resumeService from '../../api/resumeService';
import { resumeFormSchema } from '../schema/resumeSchema';

export const getResumes = createAsyncThunk('resume/getResumes', () => resumeService.getResumes());

export const addResume = createAsyncThunk('resume/addResume', (formData: FormData) => {
  console.log('DATA ----------------->', formData)
  const data = resumeFormSchema.parse(Object.fromEntries(formData));
  console.log(data)
  return resumeService.addResume(data);
});

export const updateProduct = createAsyncThunk(
  'resume/updateProduct',
  async ({ id, formData }: { id: number; formData: FormData }) => {
    const data = resumeFormSchema.parse(Object.fromEntries(formData));
    const res = await resumeService.editResume(id, data);
    return { res, id };
  },
);
