import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
export const RegenSnackBar = ({ onClose, onClick, open }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={15000}
      onClose={onClose}
      open={open}
      sx={{ width: '450px' }}
    >
      <Alert onClose={onClose} severity="info" variant="outlined" sx={{ width: '100%', backgroundColor: 'white' }}>
        <Container sx={{ display: 'flex', p: [0] }}>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: [0],
            }}
          >
            <Typography variant="body2" sx={{ display: 'flex' }}>
              Is all data correct? Regenerate
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex' }}>
              content if a match has bad data.
            </Typography>
          </Container>
          <Button
            onClick={onClick}
            variant="contained"
            sx={{
              marginLeft: 'auto',
              whiteSpace: 'nowrap',
              padding: '5px 25px',
            }}
          >
            Regen Data
          </Button>
        </Container>
      </Alert>
    </Snackbar>
  );
};

RegenSnackBar.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
