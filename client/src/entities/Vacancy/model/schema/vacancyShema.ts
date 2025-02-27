import { z } from 'zod';


export const vacancySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  companyId: z.number(),
  experience: z.string(),
  format: z.enum(['Удаленно', 'Гибрид', 'Офис']),
  schedule: z.enum(['Полная', 'Частичная', 'Проектная']),
  workDuration: z.enum(['1-3', '3-6', '6+']),
  from: z.number(),
  before: z.number(),
});

export const vacancySchem = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  companyId: z.number(),
  experience: z.string(),
  format: z.enum(['Удаленно', 'Гибрид', 'Офис']),
  schedule: z.enum(['Полная', 'Частичная', 'Проектная']),
  workDuration: z.enum(['1-3', '3-6', '6+']),
  from: z.string(),
  before: z.string(),
});

export const vacancySearchSchema = z.object({
  title: z.string().optional(),
  from: z.string().optional(),
  before: z.string().optional(),
  format: z.string().optional(),
  schedule: z.string().optional(),
  location: z.string().optional(),
  experience: z.string().optional(),
  workDuration: z.string().optional(),
});

export const vacancyFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  experience: z.string(),
  format: z.enum(['Удаленно', 'Гибрид', 'Офис']),
  schedule: z.enum(['Полная', 'Частичная', 'Проектная']),
  workDuration: z.enum(['1-3', '3-6', '6+']),
  from: z.string(),
  before: z.string(),
});

// export const resumeStatusSchema = z.object({
//   resumeId: z.number(),
//   vacancyId: z.number(),
// });

// export const resumeSchema = z.object({
//   status: z.enum(['pending', 'accepted', 'rejection']),
//   ResumeStatus: resumeStatusSchema,
// });


 export const vacancyStatusSchema = z.object({
  status: z.string(),
  Vacancy: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    location: z.string(),
    companyId: z.number(),
    experience: z.string(),
    format: z.enum(['Удаленно', 'Гибрид', 'Офис']),
    schedule: z.enum(['Полная', 'Частичная', 'Проектная']),
    workDuration: z.enum(['1-3', '3-6', '6+']),
    from: z.number(),
    before: z.number(),
  }),
});
