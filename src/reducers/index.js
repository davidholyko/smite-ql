import { combineReducers } from '@reduxjs/toolkit';

import { globalReducer } from './globalReducer';
import { playerReducer } from './playerReducer';
import { settingsReducer } from './settingsReducer';

export const rootReducer = combineReducers({
  global: globalReducer,
  player: playerReducer,
  settings: settingsReducer,
});
