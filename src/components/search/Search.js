import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { theme } from '../../theme';

const SearchWrapper = styled(Box)(({ theme }) => {
  return {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  };
});

const SearchIconWrapper = styled(Box)(({ theme }) => {
  return {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

const StyledInputBase = styled(InputBase)(({ theme }) => {
  return {
    color: 'inherit',
    '#search-form': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  };
});

export const Search = () => {
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
    <SearchWrapper theme={theme}>
      <SearchIconWrapper theme={theme}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        id="search-form"
        autoComplete="off"
        inputProps={{ 'aria-label': 'search' }}
        placeholder="Search a player..."
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={searchText}
        theme={theme}
      />
    </SearchWrapper>
  );
};

Search.propTypes = {
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
};
