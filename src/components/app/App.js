import Container from '@mui/material/Container';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { smiteConnector } from '../../api';
import { saveGods } from '../../reducers/godsReducer';
import { saveItems } from '../../reducers/itemsReducer';
import { Routes } from '../routes/Routes';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const [gods, items] = await Promise.all([smiteConnector.getGods(), smiteConnector.getItems()]);
      dispatch(saveGods(gods));
      dispatch(saveItems(items));
    };

    fetchData();
  }, []);

  return (
    <Container className="app">
      <Routes />
    </Container>
  );
};
