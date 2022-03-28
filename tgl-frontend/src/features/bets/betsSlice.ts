import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Bet, ErrorMessage } from '@types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { fetchBets, postBet } from 'services/bets';
import { Betbody } from 'services/bets/interfaces';
import { RootState } from 'store';

export const getBets = createAsyncThunk<
  Bet[],
  { params: string[] },
  { rejectValue: ErrorMessage }
>('bet/get', async ({ params }, thunkApi) => {
  try {
    const response = await fetchBets(params);

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
  error: string | null | undefined;
};

const initialState: BetState = {
  bets: [],
  status: 'IDLE',
  error: null,
};

const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    clearBetState(state) {
      state.status = 'IDLE';
      state.error = null;
    },
  },
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
        state.bets = [];

        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { clearBetState } = betsSlice.actions;
export const selectBet = (state: RootState) => state.bets;
export default betsSlice.reducer;
