import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { getPatchVersion, getGodInfo } from '../../selectors';
import { Sub } from '../../styled-components';

import { MatchCardPlatformIcon } from './MatchCardPlatformIcon';

export const MatchCardGodIcon = ({ godName, level, platform, sx, position = 'relative' }) => {
  const patchVersion = useSelector(getPatchVersion());
  const god = godName.replaceAll(' ', '_');
  const godInfo = useSelector(getGodInfo(patchVersion, god));

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
        alt={godInfo.Name}
        src={godInfo.godIcon_URL}
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
