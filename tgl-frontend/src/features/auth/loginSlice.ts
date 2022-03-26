import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store';
import { login as signin } from 'services/auth';
import { LoginBody, LoginResponse, User } from 'services/auth/interfaces';
import { ErrorMessage } from '@types';

export type AuthState = {
  user: User | null;
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';
  isAuthenticated: boolean;
  error: string | null | undefined;
};

export const login = createAsyncThunk<
  LoginResponse,
  LoginBody,
  { rejectValue: ErrorMessage }
>('auth/login', async (body, thunkApi) => {
  try {
    const response = await signin(body);
    const result = response.data;
    const tokenData = response.data.token;

    localStorage.setItem('tgl:token', JSON.stringify(tokenData));
    localStorage.setItem('tgl:user', JSON.stringify(result.user));

    return result;
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
        state.status = 'SUCCESS';
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'FAILED';
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { setIsAuthenticated, clearLoginState } = loginSlice.actions;
export const selectAuth = (state: RootState) => state.login;
export default loginSlice.reducer;

export const getUserData = (state: RootState) => {
  const user: User = JSON.parse(localStorage.getItem('tgl:user') as '{}');

  return user;
};
