import { createSlice } from '@reduxjs/toolkit';
import entries from 'lodash/entries';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    patchVersion: null,
    gods: {},
    items: {},
    matches: {},
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
    saveMatchState: (state, action) => {
      const [match] = entries(action.payload);
      const [matchId, matchState] = match;
      state.matches[matchId] = matchState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveGods, saveItems, savePatchVersion, saveMatchState } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
