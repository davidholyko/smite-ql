import { configureStore } from '@reduxjs/toolkit';

import { reducers } from '../reducers';

export const store = configureStore({
  reducer: {
    global: reducers.globalReducer,
    player: reducers.playerReducer,
  },
});
