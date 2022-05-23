import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { smiteConnector } from '../../api';
import { LOADING_STATUSES } from '../../constants';
import { savePlayerInfo } from '../../reducers/playersReducer';
import { removePlayerIdSearch } from '../../reducers/settingsReducer';
import { getPatchVersion, getPlayer } from '../../selectors';
import { Page } from '../../styled-components/StyledPage';
import { Footer } from '../footer';
import { Header } from '../header';
import { PlayerBanner, PlayerSnackBar, MapDropdown, PlayerContent } from '../player';

const {
  NOT_LOADING, // 0
  CACHE_LOOKUP, // 1
  // REQUEST_IN_PROGRESS, // 2
  REQUEST_RETURNED, // 3
  PROCESS_COMPLETE, // 4
} = LOADING_STATUSES;

export const PlayerPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { playerId, map } = useParams();

  const [loadingStatus, setLoadingStatus] = useState(NOT_LOADING);
  const [isUpdated, setIsUpdated] = useState(false);
  const [localPlayerInfo, setLocalPlayerInfo] = useState({});

  const playerInfo = useSelector(getPlayer(playerId));
  const patchVersion = useSelector(getPatchVersion());

  const fetchData = async () => {
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

    setLoadingStatus(CACHE_LOOKUP);
    const newPlayerInfo = await smiteConnector
      .getPlayerInfo(playerId)
      .catch(async (error) => {
        if (error.message === `Player history not found for ${playerId}`) {
          const playerInfo = await smiteConnector.getPlayerInfo(playerId, {
            forceUpdate: true,
            platform: get(location, 'state.platform'),
          });

          setLoadingStatus(REQUEST_RETURNED);

          return playerInfo;
        }
      })
      .catch((error) => {
        if (error.message === `Player: ${playerId} does not exist.`) {
          dispatch(removePlayerIdSearch(playerId));
        }
      });

    newPlayerInfo && dispatch(savePlayerInfo({ ...newPlayerInfo, name: playerId }));
    setLoadingStatus(PROCESS_COMPLETE);
  };

  const onUpdateContent = async () => {
    setLoadingStatus(CACHE_LOOKUP);

    const options = {
      forceUpdate: true,
      platform: get(location, 'state.platform'),
    };

    // get latest data, regen the data, and the retrieve the data
    const newPlayerInfo = await smiteConnector.getPlayerInfo(playerId, options);

    newPlayerInfo && dispatch(savePlayerInfo({ ...newPlayerInfo, name: playerId }));
    setIsUpdated(true);
    setLoadingStatus(REQUEST_RETURNED);
  };

  const onRegenData = async () => {
    setLoadingStatus(CACHE_LOOKUP);

    // get latest data, regen the data, and the retrieve the data
    await smiteConnector.regenPlayerMatches(playerId);
    const newPlayerInfo = await smiteConnector.getPlayerInfo(playerId);

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
    <Page id="player-page">
      <Header />
      <PlayerSnackBar
        onRegenData={onRegenData}
        onUpdateContent={onUpdateContent}
        loadingStatus={loadingStatus}
        isUpdated={isUpdated}
        map={map}
      />
      <MapDropdown
        loadingStatus={loadingStatus}
        playerId={get(playerInfo, 'player.ign', get(localPlayerInfo, 'player.ign'))}
      />
      <PlayerBanner
        loadingStatus={loadingStatus}
        player={!isEmpty(playerInfo) ? get(playerInfo, 'player') : get(localPlayerInfo, 'player')}
      />
      <PlayerContent
        setLoadingStatus={setLoadingStatus}
        loadingStatus={loadingStatus}
        patchVersion={patchVersion}
        playerInfo={playerInfo}
        localPlayerInfo={localPlayerInfo}
        playerId={playerId}
      />
      <Footer />
    </Page>
  );
};
