import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    player: {},
    players: [],
  },
  reducers: {
    savePlayerInfo: (state, action) => {
      const playerInfo = action.payload;
      state.player[playerInfo.name] = playerInfo;
    },
  },
});

// Action creators are generated for each case reducer function
export const { savePlayerInfo } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
