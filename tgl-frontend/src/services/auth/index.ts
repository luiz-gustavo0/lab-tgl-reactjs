import axiosInstance from 'services/api';
import {
  ChangePasswordResponse,
  LoginBody,
  LoginResponse,
  ResetPasswordResponse,
} from './interfaces';

export async function login(body: LoginBody) {
  return axiosInstance.post<LoginResponse>('/login', body);
}
export async function resetPassword(email: string) {
  return axiosInstance.post<ResetPasswordResponse>('/reset/', { email });
}
export async function changePassword(token: string, password: string) {
  return axiosInstance.post<ChangePasswordResponse>(`/reset/${token}`, {
    password,
  });
}
