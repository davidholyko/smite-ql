import { createSlice } from '@reduxjs/toolkit';

export const godsSlice = createSlice({
  name: 'gods',
  initialState: {},
  reducers: {
    saveGods: (state, action) => {
      state.gods = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveGods } = godsSlice.actions;
export const godsReducer = godsSlice.reducer;
