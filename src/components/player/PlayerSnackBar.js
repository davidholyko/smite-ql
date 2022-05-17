import includes from 'lodash/includes';
import PropTypes from 'prop-types';
import React from 'react';

import { LOADING_STATUSES } from '../../constants';
import { RegenSnackBar, UpdateSnackBar } from '../snackbar';

const {
  // NOT_LOADING, // 0
  CACHE_LOOKUP, // 1
  REQUEST_IN_PROGRESS, // 2
  REQUEST_RETURNED, // 3
  // PROCESS_COMPLETE, // 4
} = LOADING_STATUSES;

export const PlayerSnackBar = ({ onUpdateContent, onRegenData, loadingStatus, isUpdated, map }) => {
  const [open, setOpen] = React.useState(true);

  const onClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (includes([CACHE_LOOKUP, REQUEST_IN_PROGRESS, REQUEST_RETURNED], loadingStatus)) {
    return null;
  }

  if (map) {
    // dont show update content on /player/:playerid/:map route
    return null;
  }

  if (isUpdated) {
    return <RegenSnackBar onClick={onRegenData} onClose={onClose} open={open} />;
  }

  return <UpdateSnackBar onClick={onUpdateContent} onClose={onClose} open={open} />;
};

PlayerSnackBar.propTypes = {
  onUpdateContent: PropTypes.func,
  onRegenData: PropTypes.func,
  loadingStatus: PropTypes.number,
  isUpdated: PropTypes.bool,
  map: PropTypes.string,
};
