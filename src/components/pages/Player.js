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
import { WinLossBar, PlayerBanner, UpdateContentSection, MapDropdown } from '../player';

export const Player = () => {
  const dispatch = useDispatch();
  const { playerId, map } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [localPlayerInfo, setLocalPlayerInfo] = useState(null);

  const playerInfo = useSelector((state) => get(state, `player.player.${playerId}`, {}));
  const patchVersion = useSelector((state) => get(state, `global.patchVersion`));

  const fetchData = async () => {
    setIsLoading(true);

    if (map) {
      const newPlayerInfo = await smiteConnector.getPlayerInfo(playerId, { map });
      newPlayerInfo && setLocalPlayerInfo({ ...newPlayerInfo, name: playerId });
    }

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
    const newPlayerInfo = await smiteConnector.getPlayerInfo(playerId, { forceUpdate: true });
    newPlayerInfo && dispatch(savePlayerInfo({ ...newPlayerInfo, name: playerId }));
    setIsUpdated(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();

    return () => {
      setIsUpdated(false);
    };
  }, [playerId, map]);

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

    const overall = localPlayerInfo ? localPlayerInfo.overall : playerInfo.overall;
    const ranked = localPlayerInfo ? localPlayerInfo.ranked : playerInfo.ranked;
    const normal = localPlayerInfo ? localPlayerInfo.normal : playerInfo.normal;
    const matches = localPlayerInfo ? localPlayerInfo.matches : playerInfo.matches;
    const history = localPlayerInfo ? localPlayerInfo.history : playerInfo.history;

    return (
      <React.Fragment>
        <WinLossBar overall={overall} ranked={ranked} normal={normal} />
        <MatchCards matches={matches} history={history} />
      </React.Fragment>
    );
  };

  return (
    <Container sx={{ p: [0] }}>
      <Header />
      <UpdateContentSection onClick={onClick} isLoading={isLoading} isUpdated={isUpdated} map={map} />
      <MapDropdown playerId={get(playerInfo, 'player.ign')} />
      <PlayerBanner player={get(playerInfo, 'player')} />
      {renderContent()}
    </Container>
  );
};
