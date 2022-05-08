import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import { Home, Player, History, Match, NotFound } from '../pages';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" element={<Home />} />
      <Route path="/player" element={<Player />}>
        <Route path=":playerId" element={<Player />}>
          <Route path=":map" element={<Player />} />
        </Route>
      </Route>
      <Route path="/history" element={<History />} />
      <Route path="/match" element={<Match />} />
      <Route path="/*" element={<NotFound />} />
    </Switch>
  );
};
