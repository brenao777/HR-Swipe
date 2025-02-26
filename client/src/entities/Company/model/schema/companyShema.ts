// eslint-disable-next-line fsd-layers/no-import-from-top
import { vacancySchema } from '@/entities/Vacancy/model/schema/vacancyShema';
import { z } from 'zod';

export const CompanyObjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  logo: z.string(),
  location: z.string(),
});

export const companySchemaById = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  logo: z.string().optional(),
  location: z.string(),
  Vacancies: z.array(vacancySchema)
});

export const CompanyFormSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  logo: z.instanceof(File),
  location: z.string(),
});