import { Game } from '@types';

interface GamesResponse {
  min_cart_value: number;
  types: Game[];
}

export type { Game, GamesResponse };
