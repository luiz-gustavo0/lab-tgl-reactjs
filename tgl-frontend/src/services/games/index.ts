import axiosInstance from 'services/api';
import { GamesResponse } from './interfaces';

export async function fetchGames() {
  return axiosInstance.get<GamesResponse>('/cart_games');
}
