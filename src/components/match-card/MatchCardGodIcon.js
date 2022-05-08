import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

export const MatchCardGodIcon = ({ godName, sx }) => {
  const patchVersion = useSelector((state) => state.global.patchVersion);
  const name = godName.replaceAll(' ', '_');
  const god = useSelector((state) => state.global.gods[patchVersion][name]);

  return <Avatar alt={god.Name} src={god.godIcon_URL} sx={sx} />;
};

MatchCardGodIcon.propTypes = {
  sx: PropTypes.object,
  godName: PropTypes.string,
};
