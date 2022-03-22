import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import api from 'services/api';
import { RootState } from 'store';
import type { ErrorMessage, Game } from '@types';

type GetGamesResponse = {
  min_cart_value: number;
  types: Game[];
};

type GameState = {
  games: Game[];
  minCartValue: number;
  gameSelected: {
    game: Game | null;
    selected: boolean;
  };
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';
  error: ErrorMessage | null;
};

export const getGames = createAsyncThunk<
  GetGamesResponse,
  void,
  { rejectValue: ErrorMessage }
>('game/get', async (_, thunkApi) => {
  try {
    const response = await api.get('/cart_games');
    return response.data;
  } catch (error) {
    const handleError = error as AxiosError<ErrorMessage>;
    if (!handleError.response) {
      throw error;
    }
    return thunkApi.rejectWithValue(handleError.response?.data);
  }
});

const initialState: GameState = {
  games: [],
  minCartValue: 30,
  gameSelected: {
    game: null,
    selected: false,
  },
  status: 'IDLE',
  error: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameSelected(state, action: PayloadAction<string>) {
      const game = state.games.find((game) => game.type === action.payload);
      if (game) {
        state.gameSelected = {
          game,
          selected: true,
        };
      } else {
        state.gameSelected = {
          game: null,
          selected: false,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(getGames.fulfilled, (state, { payload }) => {
        state.status = 'SUCCESS';
        state.games = payload.types;
        state.minCartValue = payload.min_cart_value;
        state.gameSelected = {
          game: payload.types[0],
          selected: false,
        };
      })
      .addCase(getGames.rejected, (state, action) => {
        state.status = 'FAILED';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message! };
        }
      });
  },
});

export const { setGameSelected } = gameSlice.actions;
export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
