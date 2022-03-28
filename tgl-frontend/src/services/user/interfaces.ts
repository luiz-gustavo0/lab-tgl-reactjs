import { Bet } from '@types';

interface SignUpResponse {
  user: {
    email: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    id: number;
  };
  token: {
    type: string;
    token: string;
    expires_at: Date;
  };
}

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

interface GetUserResponse {
  id: number;
  email: string;
  is_admin: boolean;
  name: string;
  token: string;
  token_created_at: Date;
  created_at: Date;
  updated_at: Date;
  bets: Bet[];
}

interface UpadateUserData {
  name?: string;
  email?: string;
  password?: string;
}

interface UpadateUserResponse {
  id: number;
  email: string;
  is_admin: boolean;
  name: string;
  token: string;
  token_created_at: Date;
  created_at: Date;
  updated_at: Date;
}

export type {
  SignupBody,
  SignUpResponse,
  GetUserResponse,
  UpadateUserData,
  UpadateUserResponse,
};
