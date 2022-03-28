import axiosInstance from 'services/api';
import { SignupBody, SignUpResponse } from './interfaces';

export async function signUp(body: SignupBody) {
  return axiosInstance.post<SignUpResponse>('/user/create', body);
}
