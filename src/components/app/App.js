import Container from '@mui/material/Container';
import first from 'lodash/first';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { smiteConnector } from '../../api';
import { saveGods, saveItems, savePatchVersion } from '../../reducers/globalReducer';
import { Routes } from '../routes';

export const App = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.global);

  useEffect(() => {
    const fetchData = async () => {
      if (!isEmpty(globalState.gods) && !isEmpty(globalState.items)) {
        return;
      }

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
