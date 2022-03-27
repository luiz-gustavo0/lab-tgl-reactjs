import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Game } from '@types';
import type { RootState } from 'store';

type CartState = {
  cart: CartItem[];
  isCartOpen: boolean;
};

const initialState: CartState = {
  cart: [],
  isCartOpen: false,
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

    openCart(state) {
      state.isCartOpen = true;
    },

    closeCart(state) {
      state.isCartOpen = false;
    },

    clearStateCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearStateCart,
  openCart,
  closeCart,
} = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;

export const getTotalValueCart = (state: RootState) => {
  const { cart } = state.cart;

  const totalValue = cart.reduce((acc, item) => {
    return acc + item.game.price;
  }, 0);

  return totalValue;
};
