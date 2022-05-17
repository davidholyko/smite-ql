import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

export const UpdateSnackBar = ({ onClick, onClose, open }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={15000}
      onClose={onClose}
      open={open}
      sx={{ width: '525px' }}
    >
      <Alert onClose={onClose} severity="warning" variant="filled" sx={{ width: '100%' }}>
        <Container sx={{ display: 'flex', p: [0] }}>
          <Container sx={{ display: 'flex', flexDirection: 'column', p: [0] }}>
            <Typography variant="body2" sx={{ display: 'flex' }}>
              Are you looking for a more recent match?
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex' }}>
              Trigger an update to get the latest data.
            </Typography>
          </Container>
          <Button
            variant="contained"
            onClick={onClick}
            sx={{
              marginLeft: 'auto',
              whiteSpace: 'nowrap',
              padding: '5px 30px',
            }}
          >
            Update Content
          </Button>
        </Container>
      </Alert>
    </Snackbar>
  );
};

UpdateSnackBar.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
