import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useId } from 'react';
import { Link } from 'react-router-dom';

import { unparseIgn } from '../../helpers';

import { MatchCardGodIcon } from './MatchCardGodIcon';
import { MatchCardPlatformIcon } from './MatchCardPlatformIcon';

export const MatchCardPlayerGods = ({ gods, text, sx }) => {
  const id = useId();

  const renderIgn = (player) => {
    const { isProfileHidden, ign } = unparseIgn(player.ign);
    const { platform } = player;

    if (isProfileHidden) {
      return <em>{ign}</em>;
    }

    return (
      <Link to={ign} state={{ platform }} style={{ textDecoration: 'none' }}>
        {ign}
      </Link>
    );
  };

  return (
    <Container sx={sx}>
      <Typography variant="h6">{text}</Typography>
      {_.map(gods, (group, index) => {
        return (
          <Box
            key={id + index}
            sx={{
              display: 'flex',
              border: '1px solid black',
              borderRadius: '5px',
              marginX: '5px',
              padding: '5px',
              flexDirection: 'column',
            }}
          >
            {_.map(group, (player, index) => {
              return (
                <Box key={id + index} sx={{ display: 'flex', width: '250px' }}>
                  <MatchCardGodIcon godName={player.god} sx={{ marginRight: '15px' }} />
                  <Typography variant="h6">{renderIgn(player)}</Typography>
                  <Typography variant="superscript">
                    <MatchCardPlatformIcon platform={player.platform} style={{ height: '15px' }} />
                  </Typography>
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Container>
  );
};

MatchCardPlayerGods.propTypes = {
  gods: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  text: PropTypes.string,
  sx: PropTypes.object,
};
