import Container from '@mui/material/Container';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { useId } from 'react';

import { MatchCard } from './MatchCard';

const MatchCardsList = ({ history, matches }) => {
  const id = useId();
  return (
    <React.Fragment>
      {map(history, (matchId, index) => {
        return <MatchCard key={id + index} matchInfo={matches[matchId]} />;
      })}
    </React.Fragment>
  );
};

MatchCardsList.propTypes = {
  history: PropTypes.arrayOf(PropTypes.number),
  matches: PropTypes.object,
};

export const MatchCards = ({ history, matches }) => {
  return (
    <Container
      id="match-cards-container"
      maxWidth="lg"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MatchCardsList history={history} matches={matches} />
    </Container>
  );
};

MatchCards.propTypes = {
  history: PropTypes.arrayOf(PropTypes.number),
  matches: PropTypes.object,
};
