import Container from '@mui/material/Container';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { smiteConnector } from '../../api';
import { savePlayerInfo } from '../../reducers/playerReducer';
import { Header } from '../header';
import { PlayerBanner, UpdateContentSection, MapDropdown, PlayerContent } from '../player';

export const Player = () => {
  const dispatch = useDispatch();
  const { playerId, map } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [localPlayerInfo, setLocalPlayerInfo] = useState({});

  const playerInfo = useSelector((state) => get(state, `player.player.${playerId}`, {}));
  const patchVersion = useSelector((state) => get(state, `global.patchVersion`, ''));

  const fetchData = async () => {
    let newPlayerInfo = null;
    setIsLoading(true);

    if (map) {
      const newPlayerInfo = await smiteConnector.getPlayerInfo(playerId, { map });
      newPlayerInfo && setLocalPlayerInfo({ ...newPlayerInfo, name: playerId });
      setIsLoading(false);
      return;
    }

    if (!isEmpty(playerInfo) && !map) {
      setIsLoading(false);
      return;
    }

    try {
      newPlayerInfo = await smiteConnector.getPlayerInfo(playerId);
    } catch (error) {
      if (error.message === `ERR Path '$.players.${playerId}' does not exist`) {
        newPlayerInfo = await smiteConnector.getPlayerInfo(playerId, { forceUpdate: true });
      }
    }

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

    if (!map) {
      // reset local player info when we are going to a new page
      setLocalPlayerInfo({});
    }

    return () => {
      setIsUpdated(false);
    };
  }, [playerId, map]);

  return (
    <Container sx={{ p: [0] }}>
      <Header />
      <UpdateContentSection onClick={onClick} isLoading={isLoading} isUpdated={isUpdated} map={map} />
      <MapDropdown playerId={get(playerInfo, 'player.ign')} />
      <PlayerBanner player={get(playerInfo, 'player')} />
      <PlayerContent
        isLoading={isLoading}
        patchVersion={patchVersion}
        playerInfo={playerInfo}
        localPlayerInfo={localPlayerInfo}
        playerId={playerId}
      />
    </Container>
  );
};
