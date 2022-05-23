import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import React from 'react';

import { MatchCardHeader } from './MatchCardHeader';
import { MatchCardPlayerSection } from './MatchCardPlayerSection';
import { MatchCardTeams } from './MatchCardTeams';

export const MatchCard = ({ matchInfo }) => {
  return (
    <Card
      id="match-card"
      sx={{
        width: '750px',
        margin: '15px',
        padding: '0px 0px 10px 0px',
      }}
    >
      <MatchCardHeader matchInfo={matchInfo} />
      <MatchCardPlayerSection matchInfo={matchInfo} />
      <MatchCardTeams matchInfo={matchInfo} />
    </Card>
  );
};

MatchCard.propTypes = {
  matchInfo: PropTypes.object,
};
