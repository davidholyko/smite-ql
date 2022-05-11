import Container from '@mui/material/Container';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { smiteConnector } from '../../api';
import { LOADING_STATUSES } from '../../constants';
import { savePlayerInfo } from '../../reducers/playerReducer';
import { Footer } from '../footer';
import { Header } from '../header';
import { PlayerBanner, UpdateContentSection, MapDropdown, PlayerContent } from '../player';

const {
  NOT_LOADING, // 0
  CACHE_LOOKUP, // 1
  // REQUEST_IN_PROGRESS, // 2
  REQUEST_RETURNED, // 3
  PROCESS_COMPLETE, // 4
} = LOADING_STATUSES;

export const Player = () => {
  const dispatch = useDispatch();
  const { playerId, map } = useParams();
  const [loadingStatus, setLoadingStatus] = useState(NOT_LOADING);
  const [isUpdated, setIsUpdated] = useState(false);
  const [localPlayerInfo, setLocalPlayerInfo] = useState({});

  const playerInfo = useSelector((state) => get(state, `player.player.${playerId}`, {}));
  const patchVersion = useSelector((state) => get(state, `global.patchVersion`, ''));

  const fetchData = async () => {
    let newPlayerInfo = null;

    if (map) {
      setLoadingStatus(CACHE_LOOKUP);
      const newPlayerInfo = await smiteConnector.getPlayerInfo(playerId, { map });
      newPlayerInfo && setLocalPlayerInfo({ ...newPlayerInfo, name: playerId });
      setLoadingStatus(PROCESS_COMPLETE);
      return;
    }

    if (!isEmpty(playerInfo) && !map) {
      setLoadingStatus(PROCESS_COMPLETE);
      return;
    }

    try {
      setLoadingStatus(CACHE_LOOKUP);
      newPlayerInfo = await smiteConnector.getPlayerInfo(playerId);
    } catch (error) {
      if (error.message === `ERR Path '$.players.${playerId}' does not exist`) {
        newPlayerInfo = await smiteConnector.getPlayerInfo(playerId, { forceUpdate: true });
        setLoadingStatus(REQUEST_RETURNED);
      }
    }

    newPlayerInfo && dispatch(savePlayerInfo({ ...newPlayerInfo, name: playerId }));
    setLoadingStatus(PROCESS_COMPLETE);
  };

  const onClick = async () => {
    setLoadingStatus(CACHE_LOOKUP);
    const newPlayerInfo = await smiteConnector.getPlayerInfo(playerId, { forceUpdate: true });
    newPlayerInfo && dispatch(savePlayerInfo({ ...newPlayerInfo, name: playerId }));
    setIsUpdated(true);
    setLoadingStatus(REQUEST_RETURNED);
  };

  useEffect(() => {
    setLoadingStatus(0);
    fetchData();

    if (!map) {
      // reset local player info when we are going to a new page
      setLocalPlayerInfo({});
    }

    return () => {
      setIsUpdated(false);
      setLoadingStatus(NOT_LOADING);
    };
  }, [playerId, map]);

  return (
    <Container sx={{ p: [0] }}>
      <Header />
      <UpdateContentSection onClick={onClick} loadingStatus={loadingStatus} isUpdated={isUpdated} map={map} />
      <MapDropdown loadingStatus={loadingStatus} playerId={get(playerInfo, 'player.ign')} />
      <PlayerBanner loadingStatus={loadingStatus} player={get(playerInfo, 'player')} />
      <PlayerContent
        setLoadingStatus={setLoadingStatus}
        loadingStatus={loadingStatus}
        patchVersion={patchVersion}
        playerInfo={playerInfo}
        localPlayerInfo={localPlayerInfo}
        playerId={playerId}
      />
      <Footer />
    </Container>
  );
};
