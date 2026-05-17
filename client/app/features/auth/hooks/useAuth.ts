import { useMutation, useQuery } from '@tanstack/react-query';
import { getauth, registerUser, loginUser, verifyOtp } from '../api';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, VerifyOtpRequest, VerifyOtpResponse } from '../types/auth';

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: getauth,
  });
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: registerUser,
  });
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
  });
};

export const useVerifyOtp = () => {
  return useMutation<VerifyOtpResponse, Error, VerifyOtpRequest>({
    mutationFn: verifyOtp,
  });
};
