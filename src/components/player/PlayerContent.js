import Container from '@mui/material/Container';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

import { MatchCards } from '../match-card';

import { WinLossBar } from './WinLossBar';

export const PlayerContent = ({ isLoading, patchVersion, playerInfo, localPlayerInfo, playerId }) => {
  if (isLoading) {
    return <Container>SmiteQL is thinking... Please wait a moment.</Container>;
  }

  if (isEmpty(playerInfo) || isEmpty(patchVersion)) {
    // TODO: make a placeholder component
    return <Container>Player {playerId} was not found. Current version of SmiteQL only supports PC players.</Container>;
  }

  const info = !isEmpty(localPlayerInfo) ? localPlayerInfo : playerInfo;
  const { overall, ranked, normal, matches, history } = info;

  return (
    <React.Fragment>
      <WinLossBar overall={overall} ranked={ranked} normal={normal} />
      <MatchCards matches={matches} history={history} />
    </React.Fragment>
  );
};

PlayerContent.propTypes = {
  isLoading: PropTypes.bool,
  patchVersion: PropTypes.string,
  localPlayerInfo: PropTypes.object,
  playerInfo: PropTypes.object,
  playerId: PropTypes.string,
};
