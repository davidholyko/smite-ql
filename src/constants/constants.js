const isProd = process.env.NODE_ENV === 'production';

export const CONSTANTS = {
  API: {
    URL: isProd ? 'https://api.smite-ql.com' : 'http://localhost:8080',
    PING: 'ping',
    SMITE_QL: 'smite-ql',
    HISTORY: 'history',
  },
};

export const MOMENT = {
  HUMAN_TIME: 'M/D/YYYY h:mm:ss A',
  CALENDAR_TIME: 'MMMM Do YYYY h:mm:ss A',
};
