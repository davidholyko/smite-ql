import PropTypes from 'prop-types';
import React from 'react';

import { PlaystationIcon, SteamIcon, XboxIcon, SwitchIcon, HirezIcon, EpicIcon } from '../icons';

export const MatchCardPlatformIcon = ({ platform, sx }) => {
  switch (platform) {
    case 'HIREZ':
      return <HirezIcon style={sx} />;
    case 'PS4':
      return <PlaystationIcon style={sx} />;
    case 'SWITCH':
      return <SwitchIcon style={sx} />;
    case 'STEAM':
      return <SteamIcon style={sx} />;
    case 'XBOX':
      return <XboxIcon style={sx} />;
    case 'EPIC':
      return <EpicIcon style={sx} />;
    default:
      return null;
  }
};

MatchCardPlatformIcon.propTypes = {
  platform: PropTypes.string,
  sx: PropTypes.object,
};
