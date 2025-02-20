import { z } from 'zod';

export const resumeSchema = z.object({
  id: z.number(),
  userId: z.number(),
  number: z.string(),
  specialty: z.string(),
  location: z.string(),
  age: z.number(),
  experience: z.string(),
  coverLetter: z.string(),
  User: z.object({
    firstName: z.string(),
    secondName: z.string(),
  }),
});

export const resumeFormSchema = z.object({
  userId: z.string().optional(),
  number: z.string(),
  specialty: z.string(),
  location: z.string().optional(),
  age: z.string(),
  experience: z.string(),
  coverLetter: z.string().optional(),
});
