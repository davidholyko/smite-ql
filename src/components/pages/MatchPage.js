// import Container from '@mui/material/Container';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { smiteConnector } from '../../api';
import { saveMatchState } from '../../reducers/globalReducer';
import { getMatchInfo } from '../../selectors';
import { Page } from '../../styled-components/StyledPage';
import { Header } from '../header';
import { MatchPlayers } from '../match';

export const MatchPage = () => {
  const dispatch = useDispatch();
  const { matchId } = useParams();

  const matchState = useSelector(getMatchInfo(matchId));

  const fetchData = async () => {
    if (!isEmpty(matchState)) {
      return;
    }

    const matchInfo = await smiteConnector.getMatchInfo(matchId);
    dispatch(saveMatchState({ [matchId]: matchInfo }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page id="match-page">
      <Header />
      <MatchPlayers players={matchState.players} />
    </Page>
  );
};
