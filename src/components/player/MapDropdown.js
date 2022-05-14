import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import includes from 'lodash/includes';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MAPS, LOADING_STATUSES } from '../../constants';

const {
  // NOT_LOADING, // 0
  CACHE_LOOKUP, // 1
  REQUEST_IN_PROGRESS, // 2
  REQUEST_RETURNED, // 3
  // PROCESS_COMPLETE, // 4
} = LOADING_STATUSES;

const options = values(MAPS);

export const MapDropdown = ({ playerId, loadingStatus }) => {
  if (!playerId) {
    return null;
  }

  if (includes([CACHE_LOOKUP, REQUEST_IN_PROGRESS, REQUEST_RETURNED], loadingStatus)) {
    return null;
  }

  const navigate = useNavigate();
  const [value, setValue] = React.useState(MAPS['CONQUEST']);

  const onClick = () => {
    navigate(`/player/${playerId}/${value}`);
  };

  const onChange = (_event, newValue) => {
    newValue && setValue(newValue.replaceAll(' ', '_').toLowerCase());
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/player/${playerId}/${value}`);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        margin: '5px',
        justifyContent: 'center',
        maxWidth: '100vw',
      }}
    >
      <Autocomplete
        id="search-by-map-autocomplete"
        onChange={onChange}
        onKeyDown={onKeyDown}
        options={options}
        renderInput={(params) => <TextField {...params} label="Search by Match Type" />}
        value={value}
        sx={{ width: 300 }}
      />
      <Button onClick={onClick} sx={{ padding: '5px 10px' }}>
        Search
      </Button>
    </Container>
  );
};

MapDropdown.propTypes = {
  playerId: PropTypes.string,
  loadingStatus: PropTypes.number,
};
