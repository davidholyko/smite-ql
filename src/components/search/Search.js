import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
// import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { theme } from '../../constants';
import { savePlayerIdSearch } from '../../reducers/settingsReducer';

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

const SearchInput = styled(TextField)(({ theme }) => {
  return {
    color: 'inherit',
    transition: theme.transitions.create('width'),
    '#search-player-auto-complete': {
      color: 'white',
      paddingLeft: '2em',
      marginLeft: '0.75em',
      transition: 'width 0.25s ease-in-out',
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
    '#search-player-auto-complete-label': {
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white',
      // offset playerholder text when unfocused
      paddingLeft: '2.5em',
    },
    '#search-player-auto-complete-label.Mui-focused': {
      color: 'white',
      // undo offset when focused
      paddingLeft: '0em',
    },
    '.MuiAutocomplete-inputRoot': {
      // prevents width from changing text goes from blank to any string
      paddingRight: '39px',
    },
  };
});

export const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const previousSearches = useSelector((state) => state.settings.searchHistory);

  const onChange = (event) => {
    setSearchText(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && searchText) {
      navigate(`/player/${searchText}`);
      dispatch(savePlayerIdSearch(searchText));
    }
  };

  return (
    <SearchWrapper theme={theme}>
      <SearchIconWrapper theme={theme}>
        <SearchIcon />
      </SearchIconWrapper>
      <Autocomplete
        id="search-player-auto-complete"
        disablePortal={true}
        options={previousSearches}
        theme={theme}
        freeSolo={true}
        // sx={{ minWidth: '250px' }}
        getOptionLabel={(option) => String(option)}
        renderInput={(params) => (
          <SearchInput {...params} onChange={onChange} onKeyDown={onKeyDown} label="Search a player" />
        )}
      />
    </SearchWrapper>
  );
};

Search.propTypes = {
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
};
