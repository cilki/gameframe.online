
/**
 * Simple actions for a Game's instance page
 */

import { createAction } from 'redux-actions';

import { getGame } from './GameSelectors';

const fetchGameRequest = createAction('FETCH_GAME_REQUEST');
const fetchGameResponse = createAction(
  'FETCH_GAME_RESPONSE',
  (gameId, data) => {
    let payload = { gameId, data };
    if (data instanceof Error) {
      payload = Object.assign(payload, { error: true });
    }
    return payload;
  },
);

/**
 * @description - Predicate function to determine if the given
 * game id should be fetched
 * @param {Object} state
 * @param {Number} gameId
 * @returns {Boolean}
 */
function shouldFetchGame(state, gameId) {
  return getGame(state, { id: gameId }) === null;
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
      fetch(`http://api.gameframe.online/v1/game/${gameId}`, { method: 'GET' }) //eslint-disable-line
        .then(response => response.json())
        .then(json => dispatch(fetchGameResponse(gameId, json)))
        .catch(err => dispatch(fetchGameResponse(gameId, err)));
    }
  };
}

export {
  fetchGameRequest,
  fetchGameResponse,

  fetchGame,
};
