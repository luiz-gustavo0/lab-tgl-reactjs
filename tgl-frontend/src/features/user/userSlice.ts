import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store';
import api from 'services/api';
import type { ErrorMessage, User } from '@types';

type SignupCredentials = {
  name: string;
  email: string;
  password: string;
};

type UserState = {
  user: User | null;
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';
  error: ErrorMessage | null;
};

export const signUpUser = createAsyncThunk<
  User,
  SignupCredentials,
  { rejectValue: ErrorMessage }
>('users/signUpUser', async (signupCredentials, thunkApi) => {
  try {
    const response = await api.post('/user/create', signupCredentials);
    const user = response.data.user;

    return user;
  } catch (error) {
    const handleError = error as AxiosError<ErrorMessage>;
    if (!handleError.response) {
      throw error;
    }
    console.log(thunkApi.rejectWithValue(handleError.response.data));

    return thunkApi.rejectWithValue(handleError.response?.data);
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
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = 'SUCCESS';
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'FAILED';

        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message! };
        }
      });
  },
});

export const { clearUserState } = userSlice.actions;
export const selectUser = (state: RootState) => state.users;
export default userSlice.reducer;
