import type { z } from 'zod';
import type { CompanyArraySchema, CompanyObjectSchema } from "../schema/companyShema";

export type CompanyObjectType = z.infer <typeof CompanyObjectSchema>
export type CompanyArrayType = z.infer <typeof CompanyArraySchema>

export type CompanyState = {
    companyCard: CompanyArrayType;
    loading: boolean;
    error: null | string;
}