import { configureStore } from '@reduxjs/toolkit';

import loginReducer from 'features/auth/loginSlice';
import resetPasswordReducer from 'features/auth/resetPasswordSlice';
import userReducer from 'features/user/userSlice';
import betsReducer from 'features/bets/betsSlice';
import gameReducer from 'features/game/gameSlice';
import cartReducer from 'features/cart/cartSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    resetPassword: resetPasswordReducer,
    users: userReducer,
    bets: betsReducer,
    game: gameReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
