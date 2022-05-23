import { createSlice } from '@reduxjs/toolkit';

export const playersSlice = createSlice({
  name: 'players',
  initialState: {
    players: {},
  },
  reducers: {
    savePlayerInfo: (state, action) => {
      const playerInfo = action.payload;
      state.players[playerInfo.name] = playerInfo;
    },
  },
});

// Action creators are generated for each case reducer function
export const { savePlayerInfo } = playersSlice.actions;
export const playersReducer = playersSlice.reducer;
