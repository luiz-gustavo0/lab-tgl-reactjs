import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store';
import { User } from '@types';
import {
  GetUserResponse,
  SignupBody,
  SignUpResponse,
  UpadateUserData,
  UpadateUserResponse,
} from 'services/user/interfaces';
import { getUserAccount, signUp, updateUser } from 'services/user';
import { toast } from 'react-toastify';

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

export const getUser = createAsyncThunk<
  GetUserResponse,
  void,
  {
    rejectValue: ResponseError;
  }
>('users/get', async (_, thunkApi) => {
  try {
    const response = await getUserAccount();
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
      state.user = null;
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
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.status = 'SUCCESS';
        state.user = payload;
      })
      .addCase(getUser.rejected, (state, action) => {
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
