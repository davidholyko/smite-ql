import forEach from 'lodash/forEach';
import values from 'lodash/values';
import moment from 'moment';

import { MOMENT } from '../constants';

const { SMITE_API_FORMAT, CHART_FORMAT } = MOMENT;

export const toLocalTime = (momentObject) => {
  const timezoneOffset = moment().utcOffset();
  const localTime = momentObject.add(timezoneOffset, 'minutes');

  return localTime;
};

/**
 *
 * @param {Object} matches - object with keys being a matchId and value being matchInfo
 * @returns {Object} data - object with keys being date
 */
export const toMatchFrequencyFormat = (matches) => {
  const output = {
    // example:
    // '2022-01-25': {
    //   wins: 5,
    //   losses: 2,
    //   difference: 3,
    //   games: 7
    // }
  };

  forEach(values(matches), (matchInfo) => {
    const { isVictory, date } = matchInfo;
    const matchDate = moment(date, SMITE_API_FORMAT);
    const localDate = toLocalTime(matchDate).format(CHART_FORMAT);

    if (!output[localDate]) {
      output[localDate] = {
        date: localDate,
        wins: 0,
        losses: 0,
        difference: 0,
        games: 0,
      };
    }

    if (isVictory) {
      output[localDate].wins++;
      output[localDate].difference++;
      output[localDate].games++;
    } else {
      output[localDate].losses--;
      output[localDate].difference--;
      output[localDate].games++;
    }
  });

  return output;
};
