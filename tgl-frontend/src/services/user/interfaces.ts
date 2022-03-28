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

export type { SignupBody, SignUpResponse };
