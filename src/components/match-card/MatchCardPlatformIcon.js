import PropTypes from 'prop-types';
import React from 'react';

import { PlaystationIcon, SteamIcon, XboxIcon, SwitchIcon, HirezIcon, EpicIcon } from '../icons';

export const MatchCardPlatformIcon = ({ platform, style }) => {
  switch (platform) {
    case 'HIREZ':
      return <HirezIcon style={style} />;
    case 'PS4':
      return <PlaystationIcon style={style} />;
    case 'SWITCH':
      return <SwitchIcon style={style} />;
    case 'STEAM':
      return <SteamIcon style={style} />;
    case 'XBOX':
      return <XboxIcon style={style} />;
    case 'EPIC':
      return <EpicIcon style={style} />;
    default:
      return null;
  }
};

MatchCardPlatformIcon.propTypes = {
  platform: PropTypes.string,
  style: PropTypes.object,
};
