import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store';
import { ErrorMessage, User } from './authSlice';
import api from 'services/api';

type SignupCredentials = {
  name: string;
  email: string;
  password: string;
};

type UserState = {
  user: User | null;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
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
  isFetching: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearState(state) {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isFetching = false;
        state.isSuccess = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
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

export const { clearState } = userSlice.actions;
export const selectUser = (state: RootState) => state.users;
export default userSlice.reducer;
