import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store';
import { User } from '@types';
import { SignupBody, SignUpResponse } from 'services/user/interfaces';
import { signUp } from 'services/user';

type ResponseError = {
  error: {
    message: string;
  };
};

type UserState = {
  user: User | null;
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';
  error: string | null | undefined;
};

export const signUpUser = createAsyncThunk<
  SignUpResponse,
  SignupBody,
  { rejectValue: ResponseError }
>('users/signUpUser', async (body, thunkApi) => {
  try {
    const response = await signUp(body);
    return response.data;
  } catch (error) {
    const handleError = error as AxiosError<ResponseError>;
    if (!handleError.response) {
      throw error;
    }

    return thunkApi.rejectWithValue(handleError.response.data);
  }
});

const initialState: UserState = {
  user: null,
  status: 'IDLE',
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserState(state) {
      state.status = 'IDLE';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.status = 'SUCCESS';
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'FAILED';

        if (action.payload) {
          state.error = action.payload.error.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { clearUserState } = userSlice.actions;
export const selectUser = (state: RootState) => state.users;
export default userSlice.reducer;
