import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { MOMENT } from '../../constants';
import { LOADING_STATUSES } from '../../constants';

const {
  // NOT_LOADING, // 0
  CACHE_LOOKUP, // 1
  REQUEST_IN_PROGRESS, // 2
  REQUEST_RETURNED, // 3
  // PROCESS_COMPLETE, // 4
} = LOADING_STATUSES;

export const PlayerBanner = ({ player, loadingStatus }) => {
  // TODO: move logic to localize time to a helper
  const timezoneOffset = moment().utcOffset();
  const lastLoginDate = get(player, 'Last_Login_Datetime');
  const lastLogin = moment(lastLoginDate, MOMENT.HUMAN_TIME_FORMAT).add(timezoneOffset, 'minutes').fromNow();

  if (isEmpty(player)) {
    return null;
  }

  if (includes([CACHE_LOOKUP, REQUEST_IN_PROGRESS, REQUEST_RETURNED], loadingStatus)) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h3" component="h3" sx={{ textAlign: 'center' }}>
        <Link to={`/player/${player.ign}`} style={{ textDecoration: 'none' }}>
          {player.ign}
        </Link>
      </Typography>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5" component="h5" sx={{ textAlign: 'center', padding: '5px' }}>
          {player.Level}
          <sub style={{ fontFamily: 'none', fontSize: '10px' }}>LV</sub>
        </Typography>
        <Typography variant="h5" component="h5" sx={{ textAlign: 'center', padding: '5px' }}>
          {player.MasteryLevel}
          <sub style={{ fontFamily: 'none', fontSize: '10px' }}>⭐</sub>
        </Typography>
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6" component="h6" sx={{ textAlign: 'center', padding: '5px' }}>
          Last Online: {lastLogin}
        </Typography>
      </Container>
    </Container>
  );
};

PlayerBanner.propTypes = {
  player: PropTypes.object,
  loadingStatus: PropTypes.number,
};
