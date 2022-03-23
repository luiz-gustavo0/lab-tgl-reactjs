import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@types';
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
    addItemToCart(state, action: PayloadAction<CartItem>) {
      state.cart.push(action.payload);
    },
  },
});

export const { addItemToCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
