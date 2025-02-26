import type { z } from 'zod';
import { type resumeFormSchema, type resumeSchema } from '../schema/resumeSchema';

export type ResumeType = z.infer<typeof resumeSchema>;
export type ResumeFormType = z.infer<typeof resumeFormSchema>;

export type ResumeSliceType = {
  resumes: ResumeType[];
  loading: boolean;
  error: string | null;
  resumesById: ResumeType[];
  hiddenResumes: number[];
  currentResumeIndex: number;
};
