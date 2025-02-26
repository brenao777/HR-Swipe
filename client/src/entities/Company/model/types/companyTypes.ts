import type { z } from 'zod';
import type {  CompanyObjectSchema, companySchemaById } from '../schema/companyShema';

export type CompanyObjectType = z.infer<typeof CompanyObjectSchema>;
export type CompanyByIdType = z.infer<typeof companySchemaById>;

export type CompanyState = {
  company: CompanyObjectType | null;
  loading: boolean;
  error: null | string;
  myCompany: CompanyByIdType | null;
};
