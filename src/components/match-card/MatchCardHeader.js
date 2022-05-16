import { Typography } from '@mui/material';
// import Container from '@mui/material/Container';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT } from '../../constants';
import { Link } from '../../styled-components';

const { SMITE_API_FORMAT, CALENDAR_FORMAT } = MOMENT;

export const MatchCardHeader = ({ matchInfo }) => {
  const timezoneOffset = moment().utcOffset();
  const date = moment(matchInfo.date, SMITE_API_FORMAT).add(timezoneOffset, 'minutes').format(CALENDAR_FORMAT);

  return (
    <Link
      to={`/match/${matchInfo.matchId}`}
      sx={{
        backgroundColor: matchInfo.isVictory ? 'green' : 'red',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0px 10px',
      }}
    >
      <Typography variant="h6">
        ({matchInfo.matchType}) {matchInfo.matchId}
      </Typography>
      <Typography variant="h6">{matchInfo.durationInMinutes} minutes</Typography>
      <Typography variant="h6">{date}</Typography>
    </Link>
  );
};

MatchCardHeader.propTypes = {
  matchInfo: PropTypes.object,
};
