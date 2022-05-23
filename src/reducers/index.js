import { combineReducers } from '@reduxjs/toolkit';

import { globalReducer } from './globalReducer';
import { playersReducer } from './playersReducer';
import { settingsReducer } from './settingsReducer';

export const rootReducer = combineReducers({
  global: globalReducer,
  players: playersReducer,
  settings: settingsReducer,
});
