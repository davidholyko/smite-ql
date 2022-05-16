import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';

import { theme } from '../../constants';
import { Page } from '../../styled-components';
import { Search } from '../search';

export const HomePage = () => {
  return (
    <Page
      sx={{
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: ['100vh'],
        width: ['100vw'],
      }}
    >
      <Container
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '30px',
        }}
      >
        <Typography variant="h2">SmiteQL</Typography>
        <Typography>A high performance, low latency web application for Smite Match History</Typography>
      </Container>
      <Search />
    </Page>
  );
};
