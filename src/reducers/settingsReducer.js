import { createSlice } from '@reduxjs/toolkit';
import uniq from 'lodash/uniq';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    searchHistory: [],
  },
  reducers: {
    savePlayerIdSearch: (state, action) => {
      // only save last 10 recent searches
      const history = [...state.searchHistory];

      if (history.length > 10) {
        history.pop();
      }

      history.unshift(action.payload);

      state.searchHistory = uniq(history);
    },
    removePlayerIdSearch: (state, action) => {
      const history = [...state.searchHistory];
      // when we visit a page for a player that doesn't exist
      // that player will be the first item in our searchHistory

      if (history[0] === action.payload) {
        history.shift();
      }

      state.searchHistory = history;
    },
  },
});

// Action creators are generated for each case reducer function
export const { savePlayerIdSearch } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
