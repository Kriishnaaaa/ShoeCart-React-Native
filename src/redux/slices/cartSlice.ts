import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {CartItem} from '../../types/cart';
import type {Shoe} from '../../types/shoe';

type CartState = {
  items: CartItem[];
};

type AddToCartPayload = {
  shoe: Shoe;
  selectedSize: number;
};

type RemoveFromCartPayload = {
  shoeId: string;
  selectedSize: number;
};

const initialState: CartState = {
  items: [],
};

const findCartItem = (items: CartItem[], shoeId: string, selectedSize: number) =>
  items.find(item => item.shoe.id === shoeId && item.selectedSize === selectedSize);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const {shoe, selectedSize} = action.payload;
      const existingItem = findCartItem(state.items, shoe.id, selectedSize);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({shoe, selectedSize, quantity: 1});
      }
    },

    removeFromCart: (state, action: PayloadAction<RemoveFromCartPayload>) => {
      const {shoeId, selectedSize} = action.payload;
      state.items = state.items.filter(
        item => !(item.shoe.id === shoeId && item.selectedSize === selectedSize),
      );
    },

    increaseQuantity: (state, action: PayloadAction<RemoveFromCartPayload>) => {
      const {shoeId, selectedSize} = action.payload;
      const existingItem = findCartItem(state.items, shoeId, selectedSize);

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<RemoveFromCartPayload>) => {
      const {shoeId, selectedSize} = action.payload;
      const existingItem = findCartItem(state.items, shoeId, selectedSize);

      if (existingItem) {
        existingItem.quantity -= 1;

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            item => !(item.shoe.id === shoeId && item.selectedSize === selectedSize),
          );
        }
      }
    },

    clearCart: state => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: {cart: CartState}) => state.cart.items;

export const selectCartItemCount = (state: {cart: CartState}) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state: {cart: CartState}) =>
  state.cart.items.reduce(
    (total, item) => total + item.shoe.price * item.quantity,
    0,
  );

export default cartSlice.reducer;