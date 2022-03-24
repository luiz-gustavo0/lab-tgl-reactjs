import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ErrorMessage } from '@types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from 'services/api';
import { RootState } from 'store';

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

type BetPayload = {
  game_id: number;
  numbers: number[];
};

type BetCreate = {
  games: BetPayload[];
};

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

export const createBet = createAsyncThunk<
  void,
  BetCreate,
  { rejectValue: ErrorMessage }
>('bet/create', async ({ games }, thunkApi) => {
  try {
    const response = await api.post('/bet/new-bet', { games });
    if (response.status === 200) {
      toast.success('Bet save successfully');
    }
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
  filterStatus: string;
};

const initialState: BetState = {
  bets: [],
  status: 'IDLE',
  error: null,
  filterStatus: 'all',
};

const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    clearBetState(state) {
      state.bets = [];
      state.status = 'IDLE';
      state.error = null;
      state.filterStatus = 'all';
    },

    updateFilterStatus(state, action: PayloadAction<string>) {
      state.filterStatus = action.payload;
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

        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message! };
        }
      });
    builder
      .addCase(createBet.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(createBet.fulfilled, (state) => {
        state.status = 'SUCCESS';
      })
      .addCase(createBet.rejected, (state, action) => {
        state.status = 'FAILED';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message! };
        }
      });
  },
});

export const { clearBetState, updateFilterStatus } = betsSlice.actions;
export const selectBet = (state: RootState) => state.bets;
export default betsSlice.reducer;
