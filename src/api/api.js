import axios from 'axios';

import { CONSTANTS } from '../constants';

const { API } = CONSTANTS;
const { URL, PING, SMITE_QL, HISTORY } = API;

class SmiteConnector {
  async _processRequest(url) {
    const { data } = await axios({ method: 'get', url });

    if (!data.success) {
      throw new Error(data.response.message);
    }

    return data.response;
  }

  async ping() {
    const url = `${URL}/${PING}`;
    const response = await this._processRequest(url);
    return response;
  }

  async getPlayerInfo(playerId, forceUpdate = false) {
    const url = `${URL}/${HISTORY}?player=${playerId}&forceUpdate=${forceUpdate}`;
    let response;

    try {
      response = await this._processRequest(url);
    } catch (error) {
      // if player info doesnt exist, try again with latest data
      if (error.message === `ERR Path '$.players.${playerId}' does not exist`) {
        response = await this.getPlayerInfo(playerId, true);
      }
    }

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
