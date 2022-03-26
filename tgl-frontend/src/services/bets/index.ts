import { Bet } from '@types';
import axiosInstance from 'services/api';
import { Betbody } from './interfaces';

export async function fetchBets(params: string[]) {
  return axiosInstance.get<Bet[]>('/bet/all-bets', {
    params: {
      type: params,
    },
  });
}

export async function postBet(body: Betbody) {
  return axiosInstance.post('/bet/new-bet', body);
}
