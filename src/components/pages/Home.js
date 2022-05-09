import Container from '@mui/material/Container';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { theme } from '../../color';
import { Search } from '../search';

export const Home = () => {
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
      <Search onChange={onChange} onKeyDown={onKeyDown} value={searchText} />
    </Container>
  );
};
