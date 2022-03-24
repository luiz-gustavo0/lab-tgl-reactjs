import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import api from 'services/api';
import { RootState } from 'store';
import type { ErrorMessage, Game } from '@types';

type CreateGameData = {
  name: string;
  description: string;
  price: number;
  max_number: number;
  range: number;
  color: string;
};

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
  numbersSelected: number[];
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';
  error: ErrorMessage | null;
};

export const createGame = createAsyncThunk<
  void,
  CreateGameData,
  { rejectValue: ErrorMessage }
>('game/create', async (createGameData, thunkApi) => {
  try {
    const response = await api.post('/admin/create-game', createGameData);
    if (response.status === 200) {
      toast.success('Game created successfully');
    }
  } catch (error) {
    const handleError = error as AxiosError<ErrorMessage>;
    if (!handleError.response) {
      throw error;
    }
    return thunkApi.rejectWithValue(handleError.response?.data);
  }
});

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
  numbersSelected: [],
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

    addNumberSelected(state, action: PayloadAction<number>) {
      if (!state.gameSelected.game) {
        return state;
      }

      const numberExists = state.numbersSelected.find(
        (number) => number === action.payload
      );
      const maxNumber = state.gameSelected.game?.max_number;

      if (!numberExists && state.numbersSelected.length < maxNumber) {
        state.numbersSelected.push(action.payload);
      } else {
        state.numbersSelected = state.numbersSelected.filter(
          (number) => number !== numberExists
        );

        if (state.numbersSelected.length === maxNumber) {
          toast.warn('Cannot add more numbers');
        }
      }
    },

    addNumbersRandomly(state) {
      if (!state.gameSelected.game) {
        return state;
      }

      const maxNumber = state.gameSelected.game?.max_number;

      if (state.numbersSelected.length === maxNumber) {
        state.numbersSelected = [];
      }

      while (state.numbersSelected.length < maxNumber) {
        const numberRandom = Math.floor(
          Math.random() * (state.gameSelected.game.range - 1) + 1
        );

        if (!state.numbersSelected.includes(numberRandom)) {
          state.numbersSelected.push(numberRandom);
        }
      }
    },

    clearGame(state) {
      state.numbersSelected = [];
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
          selected: true,
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
    builder
      .addCase(createGame.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(createGame.fulfilled, (state) => {
        state.status = 'SUCCESS';
      })
      .addCase(createGame.rejected, (state, action) => {
        state.status = 'FAILED';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message! };
        }
      });
  },
});

export const {
  setGameSelected,
  addNumberSelected,
  clearGame,
  addNumbersRandomly,
} = gameSlice.actions;
export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;

export const generateNumbersOfGame = (state: RootState) => {
  const range = state.game.gameSelected.game?.range;
  const numbers: number[] = [];
  if (!range) {
    return numbers;
  }
  for (let i = 1; i <= range; i++) {
    numbers.push(i);
  }
  return numbers;
};
