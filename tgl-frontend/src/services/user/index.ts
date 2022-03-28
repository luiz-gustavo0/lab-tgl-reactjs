import axiosInstance from 'services/api';
import {
  GetUserResponse,
  SignupBody,
  SignUpResponse,
  UpadateUserData,
  UpadateUserResponse,
} from './interfaces';

export async function signUp(body: SignupBody) {
  return axiosInstance.post<SignUpResponse>('/user/create', body);
}

export async function getUserAccount() {
  return axiosInstance.get<GetUserResponse>('/user/my-account');
}

export async function updateUser(body: UpadateUserData) {
  return axiosInstance.put<UpadateUserResponse>('/user/update', body);
}
