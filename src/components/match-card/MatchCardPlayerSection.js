import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import { MatchCardGodIcon } from './MatchCardGodIcon';

export const MatchCardPlayerSection = ({ matchInfo }) => {
  const kda = `${matchInfo.kills} / ${matchInfo.deaths} / ${matchInfo.assists}`;

  return (
    <Container sx={{ display: 'flex', alignItems: 'center' }}>
      <MatchCardGodIcon godName={matchInfo.god} sx={{ width: 56, height: 56, marginRight: 15 }} />
      <Typography variant="h6" sx={{ marginRight: 15 }}>
        {matchInfo.god}
      </Typography>
      <Typography variant="h6" sx={{ padding: '5px 10px', borderRadius: '5px' }}>
        {kda}
      </Typography>
    </Container>
  );
};

MatchCardPlayerSection.propTypes = {
  matchInfo: PropTypes.object,
};
