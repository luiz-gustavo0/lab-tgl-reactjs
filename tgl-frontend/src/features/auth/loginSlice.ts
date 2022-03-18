import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store';
import api from 'services/api';
import type { ErrorMessage, User } from '@types';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthState = {
  user: User | null;
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';
  isAuthenticated: boolean;
  error: ErrorMessage | null;
};

export const login = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: ErrorMessage }
>('auth/login', async (loginCredentials, thunkApi) => {
  try {
    const response = await api.post('/login', loginCredentials);
    const user = response.data.user;
    const tokenData = response.data.token;

    api.defaults.headers.common.Authorization = tokenData.token;
    localStorage.setItem('tgl:token', JSON.stringify(tokenData));
    return user;
  } catch (error) {
    const handleError = error as AxiosError<ErrorMessage>;
    if (!handleError.response) {
      throw error;
    }

    return thunkApi.rejectWithValue(handleError.response?.data);
  }
});

const initialState: AuthState = {
  user: null,
  status: 'IDLE',
  isAuthenticated: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setIsAuthenticated(state, { payload }: PayloadAction<boolean>) {
      state.isAuthenticated = payload;
    },

    clearLoginState(state) {
      state.status = 'IDLE';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = 'SUCCESS';
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'FAILED';

        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message! };
        }
      });
  },
});

export const { setIsAuthenticated, clearLoginState } = loginSlice.actions;
export const selectAuth = (state: RootState) => state.login;
export default loginSlice.reducer;
