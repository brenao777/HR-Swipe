import type { z } from 'zod';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { loginSchema } from '../schema/schema';
import type { registerSchema } from '../schema/schema';

export type User = {
  id: number;
  name: string;
};

export type UserState = {
  status: 'loading' | 'logged' | 'guest';
  data: User | null;
  error: string | null;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;

export type UseUserReturnType = {
  user: UserState;
  error: string | null;
  loginHandler: (loginData: LoginCredentials) => Promise<PayloadAction<unknown>>;
  logoutHandler: () => Promise<PayloadAction<unknown>>;
  submitHandler: (registerData: RegisterFormData) => Promise<PayloadAction<unknown>>;
};
