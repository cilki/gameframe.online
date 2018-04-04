
/**
 * Simple actions for a Game's instance page
 */

import { normalize } from 'normalizr';

import {
  fetchGameRequest,
  fetchGameResponse,
  fetchDevelopersResponse,
  fetchArticlesResponse,
} from '../Actions';
import { games as gameSchema } from '../Schemas';
// import { getGame } from './GameSelectors';

/**
 * @description - Predicate function to determine if the given
 * game id should be fetched
 * @param {Object} state
 * @param {Number} gameId
 * @returns {Boolean}
 */
function shouldFetchGame(state, gameId) { //eslint-disable-line
  // const result = getGame(state, { id: gameId });
  // return !result;
  return true;
}

/**
 * @description - Requests from the API the game we want depending on the
 * returned value from the predicate. In redux jargon, a thunk creator
 * @param {Number} gameId
 * @returns {Function}
 */
function fetchGame(gameId) {
  return (dispatch, getState) => {
    if (shouldFetchGame(getState(), gameId)) {
      dispatch(fetchGameRequest(gameId));
      fetch(`${process.env.API_HOST}/v1/game/${gameId}`, { method: 'GET' }) //eslint-disable-line
        .then(response => response.json())
        .then(json => normalize(json, gameSchema))
        .then((data) => {
          if (!data.entities) {
            return Promise.resolve();
          }
          if (data.entities.developers) {
            dispatch(fetchDevelopersResponse(Object.values(data.entities.developers)));
          }
          if (data.entities.articles) {
            dispatch(fetchArticlesResponse(Object.values(data.entities.articles)));
          }

          if (data.entities.games && data.entities.games[gameId]) {
            dispatch(fetchGameResponse(gameId, data.entities.games[gameId]));
          }
          return Promise.resolve();
        })
        .catch(err => dispatch(fetchGameResponse(gameId, err)));
    }
  };
}

export { fetchGame }; //eslint-disable-line
