import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import map from 'lodash/map';
import range from 'lodash/range';
import PropTypes from 'prop-types';
import React, { useId } from 'react';
import { useSelector } from 'react-redux';

const IconPlaceHolder = () => {
  return <Avatar id="icon-placeholder" variant="square" />;
};

const ItemIcon = ({ name, patchVersion }) => {
  const item = useSelector((state) => state.global.items[patchVersion][name]);
  return <Avatar id="item-icon" src={item.itemIcon_URL} variant="square" />;
};

ItemIcon.propTypes = {
  name: PropTypes.string,
  patchVersion: PropTypes.string,
};

const ItemsList = ({ items, type, patchVersion }) => {
  const id = useId();
  let limit = null;

  switch (type) {
    case 'items':
      limit = 6;
      break;
    case 'actives':
      limit = 2;
      break;
  }

  return (
    <React.Fragment>
      {map(range(0, limit), (index) => {
        const name = items[index];
        const usePlaceHolder = !name;

        return usePlaceHolder ? (
          <IconPlaceHolder />
        ) : (
          <ItemIcon key={id + index} name={name.replaceAll(' ', '_')} patchVersion={patchVersion} />
        );
      })}
    </React.Fragment>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  patchVersion: PropTypes.string,
};

const ItemsAndActives = ({ items, actives, patchVersion }) => {
  return (
    <React.Fragment>
      <ItemsList items={items} type="items" patchVersion={patchVersion} />
      <Divider orientation="vertical" sx={{ marginX: ['10px'] }} />
      <ItemsList items={actives} type="actives" patchVersion={patchVersion} />
    </React.Fragment>
  );
};

ItemsAndActives.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  actives: PropTypes.arrayOf(PropTypes.string),
  patchVersion: PropTypes.string,
};

const MatchCard = ({ matchInfo }) => {
  const godName = matchInfo.god.replaceAll(' ', '_');
  const patchVersion = useSelector((state) => state.global.patchVersion);
  const god = useSelector((state) => state.global.gods[patchVersion][godName]);
  const kda = `${matchInfo.kills} / ${matchInfo.deaths} / ${matchInfo.assists}`;

  return (
    <Card
      id="match-card"
      sx={{
        minWidth: '300px',
        p: '15px',
        m: '15px',
      }}
    >
      <Container sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={god.Name} src={god.godIcon_URL} sx={{ width: 56, height: 56, marginRight: '10px' }} />
        <ItemsAndActives items={matchInfo.godItems} actives={matchInfo.godActives} patchVersion={patchVersion} />
      </Container>
      <Container sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            backgroundColor: matchInfo.isVictory ? 'green' : 'red',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
          }}
        >
          {kda}
        </Typography>
      </Container>
    </Card>
  );
};

MatchCard.propTypes = {
  matchInfo: PropTypes.object,
};

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

export const MatchCardsContainer = ({ history, matches }) => {
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

MatchCardsContainer.propTypes = {
  history: PropTypes.arrayOf(PropTypes.number),
  matches: PropTypes.object,
};
