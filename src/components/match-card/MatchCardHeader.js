import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import React from 'react';

export const MatchCardHeader = ({ matchInfo }) => {
  return (
    <Container
      sx={{
        backgroundColor: matchInfo.isVictory ? 'green' : 'red',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0px 5px',
      }}
    >
      <Typography variant="h6">ID: {matchInfo.matchId}</Typography>
      <Typography variant="h6">Duration: {matchInfo.durationInMinutes} minutes</Typography>
      <Typography variant="h6">Date: {matchInfo.date}</Typography>
    </Container>
  );
};

MatchCardHeader.propTypes = {
  matchInfo: PropTypes.object,
};
