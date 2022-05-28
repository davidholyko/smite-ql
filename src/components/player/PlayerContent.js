import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import delay from 'lodash/delay';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { LOADING_STATUSES } from '../../constants';
import { MatchCalendarChart } from '../charts';
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
  const info = !isEmpty(localPlayerInfo) ? localPlayerInfo : playerInfo;
  const { overall, ranked, normal, matches, history } = info;

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

  let content = null;

  switch (true) {
    case loadingStatus !== PROCESS_COMPLETE:
      content = (
        <React.Fragment>
          <Typography variant="h2" element="h2" sx={{ textAlign: 'center', padding: '20px' }}>
            {playerId}
          </Typography>
          <LoadingStepper activeStep={loadingStatus} />
        </React.Fragment>
      );
      break;
    case isEmpty(info) || isEmpty(patchVersion):
      content = (
        <React.Fragment>
          <Typography variant="body2">
            Player {playerId} was not found. Current version of SmiteQL only supports PC players.
          </Typography>
        </React.Fragment>
      );
      break;
    default:
      content = (
        <React.Fragment>
          <MatchCalendarChart />
          <WinLossBar overall={overall} ranked={ranked} normal={normal} />
          <MatchCards matches={matches} history={history} />
        </React.Fragment>
      );
  }

  return (
    <Container id="player-content" sx={{ flexGrow: 1 }}>
      {content}
    </Container>
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
