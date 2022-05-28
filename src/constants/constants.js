const isProd = process.env.NODE_ENV === 'production';

export const CONSTANTS = {
  API: {
    URL: isProd ? 'https://api.smite-ql.com' : 'http://localhost:8080',
    PING: 'ping',
    SMITE_QL: 'smite-ql',
    HISTORY: 'history',
    REGEN: 'regen',
  },
};

export const MOMENT = {
  HUMAN_TIME_FORMAT: 'MMMM Do YYYY, h:mm:ss a',
  LAST_LOGIN_FORMAT: 'M/D/YYYY h:mm:ss A',
  CALENDAR_FORMAT: 'MMMM Do YYYY h:mm A',
  CHART_FORMAT: 'Y-MM-DD',
  SMITE_API_FORMAT: 'YYYYMMDDHHmmss',
};

export const MAPS = {
  RANKED_CONQUEST: 'Ranked: Conquest',
  RANKED_JOUST: 'Ranked: Joust',
  RANKED_DUEL: 'Ranked: Duel',
  CONQUEST: 'Normal: Conquest',
  JOUST: 'Normal: Joust',
  ASSAULT: 'Normal: Assault',
  ARENA: 'Normal: Arena',
  SLASH: 'Normal: Slash',
};

export const LOADING_STATUSES = {
  NOT_LOADING: 0,
  CACHE_LOOKUP: 1,
  REQUEST_IN_PROGRESS: 2,
  REQUEST_RETURNED: 3,
  PROCESS_COMPLETE: 4,
};
