import { z } from 'zod';

export const vacancyStatusSchema = z.object({
  userId: z.number(),
  vacancyId: z.number(),
});
