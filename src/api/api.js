import axios from 'axios';
import forEach from 'lodash/forEach';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';

import { CONSTANTS } from '../constants';

const { API } = CONSTANTS;
const { URL, PING, SMITE_QL, HISTORY, REGEN } = API;

class SmiteConnector {
  async _processRequest(url) {
    const { data } = await axios({ method: 'get', url });

    if (!data.success) {
      throw new Error(data.response.message);
    }

    return data.response;
  }

  /**
   *
   * @returns {Boolean} - is smite api is available
   */
  async isSmiteApiAvailable() {
    try {
      await this.ping();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   *
   * @returns {Object} - response
   */
  async ping() {
    const url = `${URL}/${PING}`;
    const response = await this._processRequest(url);
    return response;
  }

  /**
   *
   * @param {String} playerId
   * @param {Object} options - optional query params
   * @returns
   */
  async getPlayerInfo(playerId, options) {
    let url = `${URL}/${HISTORY}?player=${playerId}`;

    forEach(pickBy(options, identity), (value, key) => {
      url += `&${key}=${value}`;
    });

    const response = await this._processRequest(url);

    return response;
  }

  async getMatches(playerId) {
    const redisPlayerId = `__${playerId.toLowerCase()}__`;
    const url = `${URL}/${SMITE_QL}?path=players.${redisPlayerId}.matches`;
    const response = await this._processRequest(url);

    return response;
  }

  async regenPlayerMatches(playerId) {
    const url = `${URL}/${REGEN}?player=${playerId}`;
    const response = await this._processRequest(url);

    return response;
  }

  async getMatchInfo(matchId) {
    const url = `${URL}/${SMITE_QL}?path=global.matches.${matchId}`;
    const response = await this._processRequest(url);
    return response;
  }

  async getGods() {
    const url = `${URL}/${SMITE_QL}?path=global.gods`;
    const response = await this._processRequest(url);
    return response;
  }

  async getItems() {
    const url = `${URL}/${SMITE_QL}?path=global.items`;
    const response = await this._processRequest(url);
    return response;
  }
}

export const smiteConnector = new SmiteConnector();
