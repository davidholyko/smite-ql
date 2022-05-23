import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { Sub } from '../../styled-components';

import { MatchCardPlatformIcon } from './MatchCardPlatformIcon';

export const MatchCardGodIcon = ({ godName, level, platform, sx, position = 'relative' }) => {
  const patchVersion = useSelector((state) => state.global.patchVersion);
  const name = godName.replaceAll(' ', '_');
  const god = useSelector((state) => state.global.gods[patchVersion][name]);

  return (
    <Box
      className="match-card-god-icon"
      sx={{
        marginRight: '15px',
        display: 'flex',
        position,
        gridColumn: 1,
        gridRow: 1,
      }}
    >
      {platform && (
        <MatchCardPlatformIcon
          platform={platform}
          sx={{
            backgroundColor: 'white',
            borderRadius: '50%',
            bottom: '-5px',
            height: '15px',
            left: '-5px',
            position: 'absolute',
            width: '15px',
            zIndex: 10,
          }}
        />
      )}
      <Avatar
        alt={god.Name}
        src={god.godIcon_URL}
        sx={{
          height: '40px',
          width: '40px',
          ...sx,
        }}
      />
      {level && (
        <Sub
          sx={{
            backgroundColor: 'black',
            borderRadius: '5px',
            bottom: '-5px',
            color: 'white',
            padding: '1px 2px',
            position: 'absolute',
            right: '-5px',
            zIndex: 10,
          }}
        >
          {level}
        </Sub>
      )}
    </Box>
  );
};

MatchCardGodIcon.propTypes = {
  sx: PropTypes.object,
  godName: PropTypes.string,
  platform: PropTypes.string,
  level: PropTypes.number,
  position: PropTypes.string,
};
