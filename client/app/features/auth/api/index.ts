import { api } from '@/app/core/api';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, VerifyOtpRequest, VerifyOtpResponse } from '../types/auth';

export const getauth = async () => {
  const { data } = await api.get('/auth');
  return data;
};

export const registerUser = async (payload: RegisterRequest): Promise<RegisterResponse> => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const loginUser = async (payload: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const verifyOtp = async (payload: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  const { data } = await api.post('/auth/verify-otp', payload);
  return data;
};
