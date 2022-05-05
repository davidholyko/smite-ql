import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import _ from 'lodash';
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
          <IconPlaceHolder key={id + index} />
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

const GodIcon = ({ godName, sx }) => {
  const patchVersion = useSelector((state) => state.global.patchVersion);
  const name = godName.replaceAll(' ', '_');
  const god = useSelector((state) => state.global.gods[patchVersion][name]);

  return <Avatar alt={god.Name} src={god.godIcon_URL} sx={sx} />;
};

GodIcon.propTypes = {
  sx: PropTypes.object,
  godName: PropTypes.string,
};

const MatchGods = ({ gods }) => {
  const id = useId();

  return (
    <React.Fragment>
      {_.map(gods, (group, index) => {
        return (
          <Box
            key={id + index}
            sx={{
              display: 'flex',
              border: '1px solid black',
              borderRadius: '5px',
              marginX: '5px',
              padding: '5px',
              flexDirection: 'column',
            }}
          >
            {_.map(group, (player, index) => {
              return (
                <Box key={id + index} sx={{ display: 'flex', width: '250px' }}>
                  <GodIcon godName={player.god} sx={{ marginRight: '15px' }} />
                  <Typography variant="h6">{player.ign}</Typography>
                </Box>
              );
            })}
          </Box>
        );
      })}
    </React.Fragment>
  );
};

MatchGods.propTypes = {
  gods: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
};

const MatchCard = ({ matchInfo }) => {
  const patchVersion = useSelector((state) => state.global.patchVersion);
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
        <GodIcon godName={matchInfo.god} sx={{ width: 56, height: 56, marginRight: 15 }} />
        <Typography variant="h6" sx={{ marginRight: 15 }}>
          {matchInfo.god}
        </Typography>
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
      <Container sx={{ display: 'flex', alignItems: 'center' }}>
        <ItemsAndActives items={matchInfo.godItems} actives={matchInfo.godActives} patchVersion={patchVersion} />
      </Container>
      <Container sx={{ display: 'flex' }}>
        <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant="h6">Allies</Typography>
          <MatchGods gods={matchInfo.allies} />
        </Container>
        <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant="h6">Enemies</Typography>
          <MatchGods gods={matchInfo.enemies} />
        </Container>
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
