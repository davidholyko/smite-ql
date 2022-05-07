import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import { Home, Player, History, Match } from '../pages';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" element={<Home />} />
      <Route path="/player" element={<Player />}>
        <Route path=":playerId" element={<Player />} />
      </Route>
      <Route path="/history" element={<History />} />
      <Route path="/match" element={<Match />} />
    </Switch>
  );
};
