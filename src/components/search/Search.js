import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { theme } from '../../constants';
import { savePlayerIdSearch } from '../../reducers/settingsReducer';
import { SearchWrapper, SearchIconWrapper, SearchInput } from '../../styled-components/StyledSearch';

const CustomPopper = (props) => {
  return <Popper {...props} style={{ width: '100%' }} placement="bottom-start" />;
};

export const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const previousSearches = useSelector((state) => state.settings.searchHistory);

  const onInputChange = (_event, newValue) => {
    setSearchText(newValue);
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
        freeSolo={true}
        getOptionLabel={(option) => String(option)}
        PopperComponent={CustomPopper}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        options={previousSearches}
        value={searchText}
        theme={theme}
        renderInput={(params) => <SearchInput onKeyDown={onKeyDown} {...params} label="Search a player" />}
      />
    </SearchWrapper>
  );
};
