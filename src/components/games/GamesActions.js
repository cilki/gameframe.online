
/**
 * Defines the actions for the Games page
 */

import { handleActions, createAction } from 'redux-actions';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';
import { normalize } from 'normalizr';

import { getGamesByPage } from './GamesSelectors';
import { PAGE_SIZE } from '../Constants';
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
  return getGamesByPage(state, { page: pageNumber }).length < PAGE_SIZE;
}

const gamesResponse = {
  objects: [gamesSchema],
};

const setGamesTotalPages = createAction('SET_GAMES_TOTAL_PAGES');
const setGamePage = createAction('SET_GAME_PAGE');

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
        encodeURI(`http://api.gameframe.online/v1/game?page=${pageNumber}&results_per_page=${PAGE_SIZE}`),
        { method: 'GET' },
      )
        .then(response => response.json())
        .then(json => normalize(json, gamesResponse))
        .then((data) => {
          if (data.result && data.result.total_pages) {
            dispatch(setGamesTotalPages(data.result.total_pages));
          }

          if (data.entities && data.entities.developers) {
            dispatch(fetchDevelopersResponse(Object.values(data.entities.developers)));
          }
          if (data.entities && data.entities.articles) {
            dispatch(fetchArticlesResponse(Object.values(data.entities.articles)));
          }
          if (data.entities && data.entities.games) {
            dispatch(fetchGamesResponse(Object.values(data.entities.games)));

            dispatch(setGamePage({
              pageNumber,
              indices: Object.keys(data.entities.games),
            }));
          }
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

/* Total number of pages for games */
const totalPages = handleActions({
  [setGamesTotalPages](state, { payload }) {
    return payload;
  },
}, 0);

const pages = handleActions({
  [setGamePage](state, { payload: { pageNumber, indices } }) {
    return state.merge({ [pageNumber]: List(indices) });
  },
}, Map());

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
  totalPages,
  pages,
});

export {
  shouldFetchGames,
  fetchGames,
  gamesReducer,
};
