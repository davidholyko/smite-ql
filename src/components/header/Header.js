import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Search } from '../search';

export const Header = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const onChange = (event) => {
    setSearchText(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/player/${searchText}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            SmiteQL
          </Typography>
          <Search onChange={onChange} onKeyDown={onKeyDown} value={searchText} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
