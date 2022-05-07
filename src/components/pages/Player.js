import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { smiteConnector } from '../../api';
import { savePlayerInfo } from '../../reducers/playerReducer';
import { Header } from '../header';
import { WinLossBar, MatchCards } from '../player';

export const Player = () => {
  const { playerId } = useParams();

  const dispatch = useDispatch();
  const playerInfo = useSelector((state) => get(state, `player.player.${playerId}`, {}));
  const patchVersion = useSelector((state) => get(state, `global.patchVersion`));

  useEffect(() => {
    const fetchData = async () => {
      let playerInfo;

      // TODO: refactor this...
      // Try 1: get player id (success if already exists)
      // Try 2: get player id (success if we can fetch new data)
      // Try 3: render a player does not exist page
      try {
        playerInfo = await smiteConnector.getPlayerInfo(playerId);
      } catch (error) {
        if (error.message === `ERR Path '$.players.${playerId}' does not exist`)
          // if player info doesn't exist, force an update in the server
          playerInfo = await smiteConnector.getPlayerInfo(playerId, true);
      }
      dispatch(savePlayerInfo({ ...playerInfo, name: playerId }));
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
      <MatchCards matches={playerInfo.matches} history={playerInfo.history} />
    </Container>
  );
};
