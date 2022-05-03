import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import React from 'react';

// eslint-disable-next-line no-unused-vars
export const WinLossBar = ({ normal, ranked, overall }) => {
  // TODO: on onHover for a section (wins, losses), display how many of those wins
  // or losses are ranked or normal
  const total = overall.wins.length + overall.losses.length;
  const winPercentage = Math.round((overall.wins.length * 100) / total);
  const lossPercentage = 100 - winPercentage;

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: `${winPercentage}%`,
          height: 25,
          backgroundColor: 'green',
          '&:hover': {
            backgroundColor: 'green',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
      <Box
        sx={{
          width: `${lossPercentage}%`,
          height: 25,
          backgroundColor: 'red',
          '&:hover': {
            backgroundColor: 'red',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
    </Container>
  );
};

WinLossBar.propTypes = {
  normal: PropTypes.shape({
    wins: PropTypes.arrayOf(PropTypes.number),
    losses: PropTypes.arrayOf(PropTypes.number),
  }),
  ranked: PropTypes.shape({
    wins: PropTypes.arrayOf(PropTypes.number),
    losses: PropTypes.arrayOf(PropTypes.number),
  }),
  overall: PropTypes.shape({
    wins: PropTypes.arrayOf(PropTypes.number),
    losses: PropTypes.arrayOf(PropTypes.number),
  }),
};
