import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import delay from 'lodash/delay';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { LOADING_STATUSES } from '../../constants';
import { LoadingStepper } from '../loading';
import { MatchCards } from '../match-card';

import { WinLossBar } from './WinLossBar';

const {
  // NOT_LOADING, // 0
  // CACHE_LOOKUP, // 1
  // REQUEST_IN_PROGRESS, // 2
  REQUEST_RETURNED, // 3
  PROCESS_COMPLETE, // 4
} = LOADING_STATUSES;

export const PlayerContent = ({
  loadingStatus,
  localPlayerInfo,
  patchVersion,
  playerId,
  playerInfo,
  setLoadingStatus,
}) => {
  useEffect(() => {
    let loadingId;

    if (loadingStatus === REQUEST_RETURNED) {
      loadingId = delay(() => {
        setLoadingStatus(PROCESS_COMPLETE);
      }, 1500);
    }

    return () => {
      clearTimeout(loadingId);
    };
  }, [loadingStatus]);

  if (loadingStatus !== PROCESS_COMPLETE) {
    return (
      <Container>
        <Typography variant="h2" element="h2" sx={{ textAlign: 'center', padding: '20px' }}>
          {playerId}
        </Typography>
        <LoadingStepper activeStep={loadingStatus} />
      </Container>
    );
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
  setLoadingStatus: PropTypes.func,
  loadingStatus: PropTypes.number,
  patchVersion: PropTypes.string,
  localPlayerInfo: PropTypes.object,
  playerInfo: PropTypes.object,
  playerId: PropTypes.string,
};
