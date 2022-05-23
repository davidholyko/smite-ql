import get from 'lodash/get';

export const getSearchHistory = () => {
  return (state) => get(state, 'settings.searchHistory', []);
};
