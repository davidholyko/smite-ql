import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';

import { theme } from '../../theme';
import { Search } from '../search';

export const Home = () => {
  return (
    <Container
      sx={{
        color: theme.palette.primary.contrastText,
        height: ['100vh'],
        width: ['100vw'],
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      maxWidth="false"
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '30px',
        }}
      >
        <Typography variant="h2">SmiteQL</Typography>
        <Typography>A high performance, low latency web application for Smite Match History</Typography>
      </Container>
      <Search />
    </Container>
  );
};
