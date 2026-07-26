import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {Order} from '../../types/order';

type OrderState = {
  orders: Order[];
};

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders = [...state.orders, action.payload];
    },
  },
});

export const {addOrder} = orderSlice.actions;

export default orderSlice.reducer;