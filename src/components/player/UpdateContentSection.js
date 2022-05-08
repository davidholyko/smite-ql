import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

export const UpdateContentSection = ({ onClick, isLoading, isUpdated, map }) => {
  if (isUpdated) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  if (map) {
    return null;
  }

  return (
    <Container sx={{ backgroundColor: 'lightgray', padding: '10px 15px', display: 'flex' }}>
      <Typography variant="subtitle2">
        Are you looking for a more recent match? Trigger an update by clicking the button.
      </Typography>

      <Button variant="contained" sx={{ marginLeft: 'auto' }} onClick={onClick}>
        Update Player Info
      </Button>
    </Container>
  );
};

UpdateContentSection.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  isUpdated: PropTypes.bool,
  map: PropTypes.string,
};
