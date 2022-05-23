import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useId } from 'react';

import { unparseIgn } from '../../helpers';
import { Link } from '../../styled-components';

import { MatchCardGodIcon } from './MatchCardGodIcon';

export const MatchCardPlayerGods = ({ gods, text, sx }) => {
  const id = useId();

  const renderIgn = (player) => {
    const { isProfileHidden, ign } = unparseIgn(player.ign);
    const { platform, rawIgn } = player;

    if (isProfileHidden) {
      return <em>{ign}</em>;
    }

    return (
      <Link to={rawIgn} state={{ platform }}>
        {rawIgn}
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
                  <MatchCardGodIcon godName={player.god} level={player.level} platform={player.platform} />
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderIgn(player)}
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
