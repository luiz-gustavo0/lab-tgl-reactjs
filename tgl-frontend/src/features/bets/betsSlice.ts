import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ErrorMessage } from '@types';
import { AxiosError } from 'axios';
import api from 'services/api';
import { RootState } from 'store';

// export type BetResponse = {
//   choosen_numbers: string;
//   user_id: number;
//   game_id: number;
//   price: number;
//   created_at: Date;
//   id: number;
// };

export interface Bet {
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
}

export const getBets = createAsyncThunk<
  Bet[],
  void,
  { rejectValue: ErrorMessage }
>('bet/get', async (_, thunkApi) => {
  try {
    const response = await api.get('/bet/all-bets');
    return response.data;
  } catch (error) {
    const handleError = error as AxiosError<ErrorMessage>;
    if (!handleError.response) {
      throw error;
    }

    return thunkApi.rejectWithValue(handleError.response?.data);
  }
});

type BetState = {
  bets: Bet[];
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';
  error: ErrorMessage | null;
};

const initialState: BetState = {
  bets: [],
  status: 'IDLE',
  error: null,
};

const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBets.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(getBets.fulfilled, (state, { payload }) => {
        state.status = 'SUCCESS';
        state.bets = payload;
      })
      .addCase(getBets.rejected, (state, action) => {
        state.status = 'FAILED';

        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message! };
        }
      });
  },
});

export const selectBet = (state: RootState) => state.bets;
export default betsSlice.reducer;
