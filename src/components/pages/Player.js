import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { smiteConnector } from '../../api';
import { savePlayerInfo } from '../../reducers/playerReducer';
import { Header } from '../header';
import { WinLossBar, MatchCards } from '../player';

export const Player = () => {
  const dispatch = useDispatch();
  const { playerId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const playerInfo = useSelector((state) => get(state, `player.player.${playerId}`, {}));
  const patchVersion = useSelector((state) => get(state, `global.patchVersion`));

  const fetchData = async () => {
    setIsLoading(true);
    const playerInfo = await smiteConnector.getPlayerInfo(playerId);
    playerInfo && dispatch(savePlayerInfo({ ...playerInfo, name: playerId }));
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();

    return () => {
      setIsUpdated(false);
    };
  }, [playerId]);

  const onClick = async () => {
    const playerInfo = await smiteConnector.getPlayerInfo(playerId, true);
    playerInfo && dispatch(savePlayerInfo({ ...playerInfo, name: playerId }));
    setIsUpdated(true);
  };

  const renderContent = () => {
    if (isLoading) {
      // TODO: make a placeholder component
      return <Container>SmiteQL is thinking... Please wait a moment.</Container>;
    }

    if (isEmpty(playerInfo) || isEmpty(patchVersion)) {
      // TODO: make a placeholder component
      return (
        <Container>Player {playerId} was not found. Current version of SmiteQL only supports PC players.</Container>
      );
    }

    isLoading;

    return (
      <React.Fragment>
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center' }}>
          {playerInfo.name}
        </Typography>
        <WinLossBar overall={playerInfo.overall} ranked={playerInfo.ranked} normal={playerInfo.normal} />
        <MatchCards matches={playerInfo.matches} history={playerInfo.history} />
      </React.Fragment>
    );
  };

  return (
    <Container sx={{ p: [0] }}>
      <Header />
      {!isUpdated && !isLoading && (
        <Container sx={{ backgroundColor: 'lightgray', padding: '10px 15px', display: 'flex' }}>
          <Typography variant="subtitle2">
            Are you looking for a more recent match? Trigger an update by clicking the button.
          </Typography>

          <Button variant="contained" sx={{ marginLeft: 'auto' }} onClick={onClick}>
            Update Player Info
          </Button>
        </Container>
      )}
      {renderContent()}
    </Container>
  );
};
