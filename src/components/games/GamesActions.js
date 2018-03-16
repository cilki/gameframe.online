
/**
 * Defines the actions for the Games page
 */

import { handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';
import { normalize } from 'normalizr';

import { games as gamesSchema } from '../Schemas';
import {
  fetchGamesRequest,
  fetchGamesResponse,
  fetchGameRequest,
  fetchGameResponse,
  fetchDevelopersResponse,
  fetchArticlesResponse,
} from '../Actions';
/**
 * @description - Predicate function that takes the page number
 * and the state and determines if we need to fetch that particular page
 * @param {Object} state
 * @param {Number} pageNumber
 * @returns {Boolean}
 */
function shouldFetchGames(state, pageNumber) { //eslint-disable-line
  /* TODO: Implement this function so it's "smart"
   * This will require looking to see if we have all of the games from a certain
   * page. This will require a fixed page size? */
  return true;
}

const gamesResponse = {
  objects: [gamesSchema],
};

/**
 * @description - Fetches the games from our public API.
 * Technically, in Redux jargon, a thunk creator
 * given the page number
 * @param {Number} pageNumber
 * @returns {Function}
 */
function fetchGames(pageNumber = 1) {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState(), pageNumber)) {
      dispatch(fetchGamesRequest());
      fetch( //eslint-disable-line
        `http://api.gameframe.online/v1/game?page=${pageNumber}`,
        { method: 'GET' },
      )
        .then(response => response.json())
        .then(json => normalize(json, gamesResponse))
        .then((data) => {
          dispatch(fetchGamesResponse(Object.values(data.entities.games)));
          dispatch(fetchDevelopersResponse(Object.values(data.entities.developers)));
          dispatch(fetchArticlesResponse(Object.values(data.entities.articles)));
        })
        .catch(err => dispatch(fetchGamesResponse(err)));
    }
  };
}

/* gamesRequested state field. Is true
 * while we're fetching for games, and false
 * otherwise. Should be used to implement a spinner */
const gamesRequested = handleActions({
  [fetchGamesRequest]() {
    return true;
  },
  [fetchGamesResponse]() {
    return false;
  },
}, false);

/* gamesError state field. Set to the error
 * message whenever we get an error while
 * fetching for games */
const gamesError = handleActions({
  [fetchGamesResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    },
  },
}, null);

/* games state field. A list of the actual
 * state for our games */
const games = handleActions({
  [fetchGamesResponse]: {
    next(state, { payload }) {
      const data = {};
      payload.forEach((game) => {
        data[game.game_id] = Map(Object.assign(
          {},
          game,
          {
            requested: false,
            error: null,
          },
          game.developers && {
            developers: List(game.developers),
          },
          game.articles && {
            articles: List(game.articles),
          },
        ));
      });

      return state.mergeDeep(data);
    },

    throw(state, { payload }) {
      console.error(payload); //eslint-disable-line
      return state;
    },
  },

  [fetchGameRequest](state, { payload }) {
    const id = payload;

    return state.mergeIn([id], {
      requested: true,
    });
  },

  // this is for a single game
  [fetchGameResponse](state, { payload }) {
    const { id, data, error } = payload;
    if (error) {
      return state.mergeIn([id], {
        requested: false,
        error: data.message,
      });
    }

    return state.mergeIn([id], Object.assign(
      {},
      data,
      {
        requested: false,
        error: null,
      },
      data.developers && {
        developers: List(data.developers),
      },
      data.articles && {
        articles: List(data.articles),
      },
    ));
  },
}, Map());

/* The reducer for all of the game's related
 * state fields */
const gamesReducer = combineReducers({
  games,
  gamesError,
  gamesRequested,
});

export {
  fetchGames,
  gamesReducer,
};
