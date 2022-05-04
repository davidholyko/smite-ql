import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    patchVersion: null,
    gods: {},
    items: {},
  },
  reducers: {
    saveGods: (state, action) => {
      state.gods = action.payload;
    },
    saveItems: (state, action) => {
      state.items = action.payload;
    },
    savePatchVersion: (state, action) => {
      state.patchVersion = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveGods, saveItems, savePatchVersion } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
