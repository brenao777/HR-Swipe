import axiosInstance, { setAccessToken } from '@/shared/api/axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthResponse, LoginCredentials, RegisterFormData } from '../types/types';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axiosInstance.get<AuthResponse>('/tokens/refresh');
  setAccessToken(response.data.accessToken);
  return response.data;
});

export const submitHandler = createAsyncThunk(
  'user/submitHandler',
  async (data: RegisterFormData) => {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    setAccessToken(response.data.accessToken);
    return response.data;
  },
);

export const loginHandler = createAsyncThunk('user/loginHandler', async (data: LoginCredentials) => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
  setAccessToken(response.data.accessToken);
  return response.data;
});

export const logoutHandler = createAsyncThunk('user/logoutHandler', async () => {
  await axiosInstance.get('/auth/logout');
  setAccessToken('');
});
