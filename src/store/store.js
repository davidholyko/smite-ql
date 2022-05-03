import { configureStore } from '@reduxjs/toolkit';

import { reducers } from '../reducers';

export const store = configureStore({
  reducer: {
    gods: reducers.godsReducer,
    items: reducers.itemsReducer,
  },
});
