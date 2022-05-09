import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT } from '../../constants';

const { SMITE_API_FORMAT, CALENDAR_FORMAT } = MOMENT;

export const MatchCardHeader = ({ matchInfo }) => {
  const date = moment(matchInfo.date, SMITE_API_FORMAT).format(CALENDAR_FORMAT);

  return (
    <Container
      sx={{
        backgroundColor: matchInfo.isVictory ? 'green' : 'red',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0px 5px',
      }}
    >
      <Typography variant="h6">
        ({matchInfo.map}) {matchInfo.matchId}
      </Typography>
      <Typography variant="h6">{matchInfo.durationInMinutes} minutes</Typography>
      <Typography variant="h6">{date}</Typography>
    </Container>
  );
};

MatchCardHeader.propTypes = {
  matchInfo: PropTypes.object,
};
