import Avatar from '@mui/material/Avatar';
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

        if (!name) {
          return <IconPlaceHolder key={id + index} />;
        }

        return <ItemIcon key={id + index} name={name.replaceAll(' ', '_')} patchVersion={patchVersion} />;
      })}
    </React.Fragment>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  patchVersion: PropTypes.string,
};

export const MatchCardItemsAndActives = ({ items, actives, patchVersion }) => {
  return (
    <Container id="match-card-items-and-actives" component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
      <ItemsList items={items} type="items" patchVersion={patchVersion} />
      <Divider orientation="vertical" sx={{ marginX: ['10px'] }} />
      <ItemsList items={actives} type="actives" patchVersion={patchVersion} />
    </Container>
  );
};

MatchCardItemsAndActives.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  actives: PropTypes.arrayOf(PropTypes.string),
  patchVersion: PropTypes.string,
};
