import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { MatchCardHeader } from './MatchCardHeader';
import { MatchCardItemsAndActives } from './MatchCardItemsAndActives';
import { MatchCardPlayerSection } from './MatchCardPlayerSection';
import { MatchCardTeams } from './MatchCardTeams';

export const MatchCard = ({ matchInfo }) => {
  const patchVersion = useSelector((state) => state.global.patchVersion);

  return (
    <Card
      id="match-card"
      sx={{
        minWidth: '300px',
        padding: '15px',
        margin: '15px',
      }}
    >
      <MatchCardHeader matchInfo={matchInfo} />
      <MatchCardPlayerSection matchInfo={matchInfo} />
      <MatchCardItemsAndActives items={matchInfo.godItems} actives={matchInfo.godActives} patchVersion={patchVersion} />
      <MatchCardTeams matchInfo={matchInfo} />
    </Card>
  );
};

MatchCard.propTypes = {
  matchInfo: PropTypes.object,
};
