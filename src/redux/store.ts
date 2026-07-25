import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
} from 'redux-persist';

import {persistConfig} from './persistConfig';

import shoeReducer from './slices/shoeSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
  shoes: shoeReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;