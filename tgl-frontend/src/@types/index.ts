export type User = {
  id: number;
  email: string;
  name: string;
};

export type ErrorMessage = {
  message: string;
};

export type Game = {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: number;
  color: string;
};
