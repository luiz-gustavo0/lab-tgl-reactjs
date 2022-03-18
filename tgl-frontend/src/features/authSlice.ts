import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store';
import api from 'services/api';

export type LoginCredentials = {
  email: string;
  password: string;
};

type ResetPasswordResponse = {
  user: User;
  token: string;
};

type ResetPasswordCredentials = {
  email: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
};

export type ErrorMessage = {
  message: string;
};

export type AuthState = {
  user: User | null;
  resetPasswordData: ResetPasswordResponse | null;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
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

export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordCredentials,
  { rejectValue: ErrorMessage }
>('auth/resetPassword', async ({ email }, thunkApi) => {
  try {
    const response = await api.post('/reset', { email });
    const data = response.data;

    return data;
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
  resetPasswordData: null,
  isFetching: false,
  isAuthenticated: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setIsAuthenticated(state, { payload }: PayloadAction<boolean>) {
      state.isAuthenticated = payload;
    },

    clearState(state) {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
        state.isFetching = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;

        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message! };
        }
      });
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.resetPasswordData = payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;

        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message! };
        }
      });
  },
});

export const { setIsAuthenticated, clearState } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
