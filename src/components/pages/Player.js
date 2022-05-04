import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { smiteConnector } from '../../api';
import { savePlayerInfo } from '../../reducers/playerReducer';
import { Header } from '../header';
import { WinLossBar, MatchCardsContainer } from '../player';

export const Player = () => {
  const dispatch = useDispatch();
  const playerInfo = useSelector((state) => get(state, `player.player.dhko`, {}));
  const patchVersion = useSelector((state) => get(state, `global.patchVersion`));

  useEffect(() => {
    const fetchData = async () => {
      const playerInfo = await smiteConnector.getPlayerInfo('dhko');
      dispatch(savePlayerInfo({ ...playerInfo, name: 'dhko' }));
    };

    fetchData();

    return () => {};
  }, []);

  if (isEmpty(playerInfo) || isEmpty(patchVersion)) {
    // TODO: make a placeholder component
    return <Container>Placeholder</Container>;
  }

  return (
    <Container sx={{ p: [0] }}>
      <Header />
      <Typography variant="h3" component="h3" sx={{ textAlign: 'center' }}>
        {playerInfo.name}
      </Typography>
      <WinLossBar overall={playerInfo.overall} ranked={playerInfo.ranked} normal={playerInfo.normal} />
      <MatchCardsContainer matches={playerInfo.matches} history={playerInfo.history} />
    </Container>
  );
};
