import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT } from '../../constants';

export const PlayerBanner = ({ player }) => {
  if (isEmpty(player)) {
    return null;
  }

  // for names like [USA]dhko, gets everything after ']' character
  const name = player.TeamId ? player.Name.match(/\](.*)/)[1] : player.Name;
  const mostRecentGame = moment(player.Last_Login_Datetime, MOMENT.HUMAN_TIME).fromNow();

  return (
    <Container>
      <Typography variant="h3" component="h3" sx={{ textAlign: 'center' }}>
        {name}
      </Typography>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5" component="h5" sx={{ textAlign: 'center', padding: '5px' }}>
          {player.Level} ⭐
        </Typography>
        <Typography variant="h5" component="h5" sx={{ textAlign: 'center', padding: '5px' }}>
          {player.MasteryLevel} 💎
        </Typography>
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6" component="h6" sx={{ textAlign: 'center', padding: '5px' }}>
          Most Recent Game: {mostRecentGame}
        </Typography>
      </Container>
    </Container>
  );
};

PlayerBanner.propTypes = {
  player: PropTypes.object,
};
