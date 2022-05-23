import get from 'lodash/get';

export const getGlobal = () => {
  return (state) => get(state, 'global', {});
};

export const getPatchVersion = () => {
  return (state) => get(state, 'global.patchVersion', '');
};

export const getGodInfo = (patchVersion, godName) => {
  return (state) => get(state, `global.gods[${patchVersion}][${godName}]`, {});
};

export const getItemInfo = (patchVersion, itemName) => {
  return (state) => get(state, `global.items[${patchVersion}][${itemName}]`, {});
};

export const getMatchInfo = (matchId) => {
  return (state) => get(state, `global.matches[${matchId}]`, {});
};
