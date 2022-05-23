import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import get from 'lodash/get';
import map from 'lodash/map';
import range from 'lodash/range';
import PropTypes from 'prop-types';
import React, { useId } from 'react';
import { useSelector } from 'react-redux';

import { getPatchVersion } from '../../selectors';

const IconPlaceHolder = () => {
  return (
    <Avatar id="icon-placeholder" variant="square" sx={{ borderRight: '1px solid black' }}>
      &nbsp;
    </Avatar>
  );
};

const ItemIcon = ({ name, patchVersion }) => {
  const item = useSelector((state) => state.global.items[patchVersion][name]);
  return <Avatar id="item-icon" src={item.itemIcon_URL} variant="square" sx={{ borderRight: '1px solid black' }} />;
};

ItemIcon.propTypes = {
  name: PropTypes.string,
  patchVersion: PropTypes.string,
};

export const ItemsList = ({ items, type, patchVersion, sx }) => {
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
    <Container sx={sx}>
      {map(range(0, limit), (index) => {
        const name = get(items, index, '').replaceAll(' ', '_');

        if (!name) {
          return <IconPlaceHolder key={id + index} />;
        }

        return <ItemIcon key={id + index} name={name} patchVersion={patchVersion} />;
      })}
    </Container>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  patchVersion: PropTypes.string,
  sx: PropTypes.object,
};

export const MatchCardItemsAndActives = ({ items, actives, sx }) => {
  const patchVersion = useSelector(getPatchVersion());

  return (
    <Container
      id="match-card-items-and-actives"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <ItemsList items={items} type="items" patchVersion={patchVersion} />
      <ItemsList items={actives} type="actives" patchVersion={patchVersion} />
    </Container>
  );
};

MatchCardItemsAndActives.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  actives: PropTypes.arrayOf(PropTypes.string),
  patchVersion: PropTypes.string,
  sx: PropTypes.object,
};
