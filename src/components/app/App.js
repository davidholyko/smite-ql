import Container from '@mui/material/Container';
import first from 'lodash/first';
import keys from 'lodash/keys';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { smiteConnector } from '../../api';
import { saveGods, saveItems, savePatchVersion } from '../../reducers/globalReducer';
import { Routes } from '../routes/Routes';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const [gods, items] = await Promise.all([smiteConnector.getGods(), smiteConnector.getItems()]);
      dispatch(saveGods(gods));
      dispatch(saveItems(items));
      dispatch(savePatchVersion(first(keys(gods))));
    };

    fetchData();
  }, []);

  return (
    <Container id="app" sx={{ p: [0] }}>
      <Routes />
    </Container>
  );
};
