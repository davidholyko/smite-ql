import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import { theme } from '../../theme';
import { Search } from '../search';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Link to="/" style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }}>
              SmiteQL
            </Link>
          </Typography>
          <Search />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
