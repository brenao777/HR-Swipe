import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(1, 'Name is required'),
  secondName: z.string().min(1, 'secondName is required'),
  company: z.boolean(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
