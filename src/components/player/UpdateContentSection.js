import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import includes from 'lodash/includes';
import PropTypes from 'prop-types';
import React from 'react';

import { LOADING_STATUSES, theme } from '../../constants';

const {
  // NOT_LOADING, // 0
  CACHE_LOOKUP, // 1
  REQUEST_IN_PROGRESS, // 2
  REQUEST_RETURNED, // 3
  // PROCESS_COMPLETE, // 4
} = LOADING_STATUSES;

export const UpdateContentSection = ({ onClick, loadingStatus, isUpdated, map }) => {
  if (isUpdated) {
    return null;
  }

  if (includes([CACHE_LOOKUP, REQUEST_IN_PROGRESS, REQUEST_RETURNED], loadingStatus)) {
    return null;
  }

  if (map) {
    return null;
  }

  return (
    <Container
      sx={{
        backgroundColor: '#EEE',
        padding: '10px 15px',
        display: 'flex',
        justifyContent: 'center',
      }}
      theme={theme}
    >
      <Container sx={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
        <Typography variant="body2">Are you looking for a more recent match?</Typography>
        <Typography variant="body2">Trigger an update by clicking the button.</Typography>
      </Container>

      <Button
        variant="contained"
        sx={{ marginLeft: 'auto', whiteSpace: 'nowrap', padding: '5px 15px' }}
        onClick={onClick}
      >
        Update Player
      </Button>
    </Container>
  );
};

UpdateContentSection.propTypes = {
  onClick: PropTypes.func,
  loadingStatus: PropTypes.number,
  isUpdated: PropTypes.bool,
  map: PropTypes.string,
};
