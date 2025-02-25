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
  photo: z.string(),
  User: z.object({
    firstName: z.string(),
    secondName: z.string(),
  }),
});

export const resumeFormSchema = z.object({
  number: z.string(),
  specialty: z.string(),
  location: z.string(),
  age: z.string(),
  experience: z.string(),
  coverLetter: z.string(),
  photo: z.instanceof(File),
});
