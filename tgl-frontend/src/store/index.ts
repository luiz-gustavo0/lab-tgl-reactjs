import { configureStore } from '@reduxjs/toolkit';

import loginReducer from 'features/auth/loginSlice';
import resetPasswordReducer from 'features/auth/resetPasswordSlice';
import userReducer from 'features/user/userSlice';
import betsReducer from 'features/bets/betsSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    resetPassword: resetPasswordReducer,
    users: userReducer,
    bets: betsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
