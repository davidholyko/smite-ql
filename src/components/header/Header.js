import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { smiteConnector } from '../../api';
import { theme } from '../../constants';
import { Search } from '../search';

export const Header = () => {
  const [isSmiteApiAvailable, setIsSmiteApiAvailable] = useState();

  const fetchData = async () => {
    const status = await smiteConnector.isSmiteApiAvailable();
    setIsSmiteApiAvailable(status);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppBar position="static" sx={{ paddingY: '5px' }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }}>
            SmiteQL {isSmiteApiAvailable ? '🟢' : '🟡'}
          </Link>
        </Typography>
        <Search />
      </Toolbar>
    </AppBar>
  );
};
