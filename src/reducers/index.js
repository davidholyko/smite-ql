import { combineReducers } from '@reduxjs/toolkit';

import { globalReducer } from './globalReducer';
import { playerReducer } from './playerReducer';

export const rootReducer = combineReducers({
  global: globalReducer,
  player: playerReducer,
});
