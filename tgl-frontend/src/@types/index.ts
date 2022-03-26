export type User = {
  id: number;
  email: string;
  name: string;
  is_admin: boolean;
  bets: Game[];
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

export type Bet = {
  id: number;
  user_id: number;
  game_id: number;
  choosen_numbers: string;
  price: number;
  created_at: Date;
  type: {
    id: number;
    type: string;
  };
};

export type CartItem = {
  id: string;
  numbers: number[];
  game: Game;
};
