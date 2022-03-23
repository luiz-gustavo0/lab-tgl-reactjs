import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Game } from '@types';
import type { RootState } from 'store';

type CartState = {
  cart: CartItem[];
  totalCartValue: number;
};

const initialState: CartState = {
  cart: [],
  totalCartValue: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(
      state,
      action: PayloadAction<{ game: Game; numbers: number[] }>
    ) {
      const id = Math.random().toString(36).substring(2, 5);
      const cartItem = {
        id,
        game: action.payload.game,
        numbers: action.payload.numbers,
      };
      state.cart.push(cartItem);
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
