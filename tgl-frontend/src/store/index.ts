import { configureStore } from '@reduxjs/toolkit';

import loginReducer from 'features/auth/loginSlice';
import resetPasswordReducer from 'features/auth/resetPasswordSlice';
import userReducer from 'features/user/userSlice';
import betsReducer from 'features/bets/betsSlice';
import gameReducer from 'features/game/gameSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    resetPassword: resetPasswordReducer,
    users: userReducer,
    bets: betsReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
