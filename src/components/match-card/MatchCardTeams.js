import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import React from 'react';

import { MatchCardPlayerGods } from './MatchCardPlayerGods';

export const MatchCardTeams = ({ matchInfo }) => {
  return (
    <Container sx={{ display: 'flex' }}>
      <MatchCardPlayerGods
        gods={matchInfo.allies}
        text={'Allies'}
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      />
      <MatchCardPlayerGods
        gods={matchInfo.enemies}
        text={'Enemies'}
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      />
    </Container>
  );
};

MatchCardTeams.propTypes = {
  matchInfo: PropTypes.object,
};
