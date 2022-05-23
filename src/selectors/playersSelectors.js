import get from 'lodash/get';

export const getPlayer = (playerId) => {
  return (state) => get(state, `players.players.${playerId}`, {});
};
