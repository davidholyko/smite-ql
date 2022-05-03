import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {},
  reducers: {
    saveItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveItems } = itemsSlice.actions;
export const itemsReducer = itemsSlice.reducer;
