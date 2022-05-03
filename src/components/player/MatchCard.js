import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import React from 'react';

// eslint-disable-next-line no-unused-vars
export const MatchCard = ({ matchInfo }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56 }} />
    </Container>
  );
};

MatchCard.propTypes = {
  matchInfo: PropTypes.object,
};
