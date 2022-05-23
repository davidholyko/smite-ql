import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { MatchCardGodIcon } from './MatchCardGodIcon';
import { ItemsList } from './MatchCardItemsAndActives';

export const MatchCardPlayerSection = ({ matchInfo }) => {
  const patchVersion = useSelector((state) => state.global.patchVersion);
  const kda = `${matchInfo.kills} / ${matchInfo.deaths} / ${matchInfo.assists}`;

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr',
          gridTemplateRows: '3fr',
        }}
      >
        <MatchCardGodIcon
          godName={matchInfo.god}
          position={'absolute'}
          sx={{
            width: '75px',
            height: '75px',
            gridColumn: 1,
            gridRow: 1,
          }}
        />
        <ItemsList
          items={matchInfo.godItems}
          type="items"
          patchVersion={patchVersion}
          sx={{
            display: 'flex',
            gridColumn: 2,
            gridRow: 1,
            margin: '5px 0',
          }}
        />
        <ItemsList
          items={matchInfo.godActives}
          type="actives"
          patchVersion={patchVersion}
          sx={{
            display: 'flex',
            gridColumn: 2,
            gridRow: 2,
            margin: '15px 0 0',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            gridColumn: 1,
            gridRow: 1,
            display: 'flex',
            alignItems: 'end',
            marginLeft: 'auto',
          }}
        >
          Level {matchInfo.godLevel} / {matchInfo.gold}g
        </Typography>
        <Typography
          variant="h6"
          sx={{
            gridColumn: 1,
            gridRow: 2,
            textAlign: 'right',
            alignSelf: 'end',
          }}
        >
          {kda}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            gridColumn: 1,
            gridRow: 2,
            textAlign: 'left',
            alignSelf: 'end',
          }}
        >
          {matchInfo.god}
        </Typography>
      </Container>
    </Container>
  );
};

MatchCardPlayerSection.propTypes = {
  matchInfo: PropTypes.object,
};
