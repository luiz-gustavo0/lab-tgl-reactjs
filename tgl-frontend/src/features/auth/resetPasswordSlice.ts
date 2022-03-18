import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store';
import type { ErrorMessage, User } from '@types';

import api from 'services/api';

type ResetPasswordResponse = {
  user: User;
  token: string;
};

type ResetPasswordState = {
  user: User | null;
  token: string | null;
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';
  error: ErrorMessage | null;
};

export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  { email: string },
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

const initialState: ResetPasswordState = {
  user: null,
  token: null,
  status: 'IDLE',
  error: null,
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    clearResetPasswordState(state) {
      state.status = 'IDLE';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.status = 'SUCCESS';
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'FAILED';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message! };
        }
      });
  },
});

export const { clearResetPasswordState } = resetPasswordSlice.actions;
export const selectResetPassword = (state: RootState) => state.resetPassword;
export default resetPasswordSlice.reducer;
