import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { theme } from '../../constants';
import { savePlayerIdSearch } from '../../reducers/settingsReducer';

import { SearchWrapper, SearchIconWrapper, SearchInput } from './styled-components';

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
