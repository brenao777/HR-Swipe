import type { z } from 'zod';
import type { ConditionsArraySchema, ConditionsObjectSchema } from '../schema/conditionsSchema';

export type ConditionsObjectType = z.infer <typeof ConditionsObjectSchema>
export type ConditionsArrayType = z.infer <typeof ConditionsArraySchema>

export type ConditionsState = {
    conditions: ConditionsArrayType;
    loading: boolean;
    error: null | string;
}