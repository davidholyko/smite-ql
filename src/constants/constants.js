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
  HUMAN_TIME_FORMAT: 'M/D/YYYY h:mm:ss A',
  CALENDAR_FORMAT: 'MMMM Do YYYY h:mm A',
  SMITE_API_FORMAT: 'YYYYMMDDHHmmss',
};

export const MAPS = {
  RANKED_CONQUEST: 'Ranked Conquest',
  RANKED_JOUST: 'Ranked Joust',
  RANKED_DUEL: 'Ranked Duel',
  CONQUEST: 'Conquest',
  JOUST: 'Joust',
  ASSAULT: 'Assault',
  ARENA: 'Arena',
  SLASH: 'Slash',
};

export const LOADING_STATUSES = {
  NOT_LOADING: 0,
  CACHE_LOOKUP: 1,
  REQUEST_IN_PROGRESS: 2,
  REQUEST_RETURNED: 3,
  PROCESS_COMPLETE: 4,
};
