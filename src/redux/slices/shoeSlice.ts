import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Shoe} from '../../types/shoe';

interface ShoeState {
  shoes: Shoe[];
}

const initialState: ShoeState = {
  shoes: [],
};

const shoeSlice = createSlice({
  name: 'shoes',
  initialState,
  reducers: {
    addShoe: (state, action: PayloadAction<Shoe>) => {
      state.shoes.push(action.payload);
    },

    editShoe: (state, action: PayloadAction<Shoe>) => {
      const index = state.shoes.findIndex(
        shoe => shoe.id === action.payload.id,
      );

      if (index !== -1) {
        state.shoes[index] = action.payload;
      }
    },

    deleteShoe: (state, action: PayloadAction<string>) => {
      state.shoes = state.shoes.filter(
        shoe => shoe.id !== action.payload,
      );
    },
  },
});

export const {
  addShoe,
  editShoe,
  deleteShoe,
} = shoeSlice.actions;

export default shoeSlice.reducer;