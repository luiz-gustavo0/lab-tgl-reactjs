interface User {
  id: number;
  email: string;
  is_admin: boolean;
  name: string;
  token: string;
  token_created_at: Date;
  created_at: Date;
  updated_at: Date;
  picture: null;
}

interface Token {
  type: string;
  token: string;
  expires_at: Date;
}

interface LoginResponse {
  user: User;
  token: Token;
}

interface LoginBody {
  email: string;
  password: string;
}

interface ChangePasswordResponse {
  id: number;
  email: string;
  is_admin: boolean;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface ResetPasswordResponse extends ChangePasswordResponse {
  token: string;
  token_created_at: Date;
}

export type {
  User,
  LoginBody,
  LoginResponse,
  ResetPasswordResponse,
  ChangePasswordResponse,
};
