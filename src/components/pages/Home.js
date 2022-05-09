import Container from '@mui/material/Container';
import React from 'react';

import { theme } from '../../color';
import { Search } from '../search';

export const Home = () => {
  return (
    <Container
      sx={{
        color: 'white',
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Search />
    </Container>
  );
};
