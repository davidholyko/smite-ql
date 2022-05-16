import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import { HomePage, PlayerPage, MatchPage, NotFoundPage } from '../pages';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/player" element={<PlayerPage />}>
        <Route path=":playerId" element={<PlayerPage />}>
          <Route path=":map" element={<PlayerPage />} />
        </Route>
      </Route>
      <Route path="/match" element={<MatchPage />}>
        <Route path=":matchId" element={<MatchPage />} />
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Switch>
  );
};
