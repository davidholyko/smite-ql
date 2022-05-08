import Container from '@mui/material/Container';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { smiteConnector } from '../../api';
import { savePlayerInfo } from '../../reducers/playerReducer';
import { Header } from '../header';
import { MatchCards } from '../match-card';
import { WinLossBar, PlayerBanner, UpdateContentSection } from '../player';

export const Player = () => {
  const dispatch = useDispatch();
  const { playerId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const playerInfo = useSelector((state) => get(state, `player.player.${playerId}`, {}));
  const patchVersion = useSelector((state) => get(state, `global.patchVersion`));

  const fetchData = async () => {
    setIsLoading(true);

    if (!isEmpty(playerInfo)) {
      setIsLoading(false);
      return;
    }

    const newPlayerInfo = await smiteConnector.getPlayerInfo(playerId);
    newPlayerInfo && dispatch(savePlayerInfo({ ...newPlayerInfo, name: playerId }));
    setIsLoading(false);
  };

  const onClick = async () => {
    setIsLoading(true);
    const newPlayerInfo = await smiteConnector.getPlayerInfo(playerId, true);
    newPlayerInfo && dispatch(savePlayerInfo({ ...newPlayerInfo, name: playerId }));
    setIsUpdated(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();

    return () => {
      setIsUpdated(false);
    };
  }, [playerId]);

  const renderContent = () => {
    if (isLoading) {
      return <Container>SmiteQL is thinking... Please wait a moment.</Container>;
    }

    if (isEmpty(playerInfo) || isEmpty(patchVersion)) {
      // TODO: make a placeholder component
      return (
        <Container>Player {playerId} was not found. Current version of SmiteQL only supports PC players.</Container>
      );
    }

    return (
      <React.Fragment>
        <WinLossBar overall={playerInfo.overall} ranked={playerInfo.ranked} normal={playerInfo.normal} />
        <MatchCards matches={playerInfo.matches} history={playerInfo.history} />
      </React.Fragment>
    );
  };

  return (
    <Container sx={{ p: [0] }}>
      <Header />
      <UpdateContentSection onClick={onClick} isLoading={isLoading} isUpdated={isUpdated} />
      <PlayerBanner player={playerInfo.player} />
      {renderContent()}
    </Container>
  );
};
