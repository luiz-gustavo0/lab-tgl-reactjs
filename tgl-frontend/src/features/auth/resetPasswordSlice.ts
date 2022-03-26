import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store';
import { ResetPasswordResponse } from 'services/auth/interfaces';
import { resetPassword } from 'services/auth';
import { ErrorMessage } from '@types';

type ResetPasswordState = {
  user: ResetPasswordResponse | null;
  token: string | null;
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';
  error: string | null | undefined;
};

export const resetPasswordThunk = createAsyncThunk<
  ResetPasswordResponse,
  { email: string },
  { rejectValue: ErrorMessage }
>('auth/resetPassword', async ({ email }, thunkApi) => {
  try {
    const response = await resetPassword(email);
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
      .addCase(resetPasswordThunk.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(resetPasswordThunk.fulfilled, (state, { payload }) => {
        state.status = 'SUCCESS';
        state.user = payload;
        state.token = payload.token;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.status = 'FAILED';
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { clearResetPasswordState } = resetPasswordSlice.actions;
export const selectResetPassword = (state: RootState) => state.resetPassword;
export default resetPasswordSlice.reducer;
