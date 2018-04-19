/**
 * Defines the actions for the Navbar component.
 */

import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  getGamesCount,
  getDevelopersCount,
  getArticlesCount,
} from './NavbarSelectors';

const fetchGamesCountRequest = createAction('FETCH_GAMES_COUNT_REQUEST');
const fetchGamesCountResponse = createAction('FETCH_GAMES_COUNT_RESPONSE');
const fetchDevelopersCountRequest = createAction('FETCH_DEVELOPERS_COUNT_REQUEST');
const fetchDevelopersCountResponse = createAction('FETCH_DEVELOPERS_COUNT_RESPONSE');
const fetchArticlesCountRequest = createAction('FETCH_ARTICLES_COUNT_REQUEST');
const fetchArticlesCountResponse = createAction('FETCH_ARTICLES_COUNT_RESPONSE');

/**
 * @descriptin - Determine if the count of games should be fetched.
 * @param {Object} state
 * @returns {Boolean}
 */
function shouldFetchGamesCount(state) {
  return getGamesCount(state) == 0;
}

/**
 * @descriptin - Determine if the count of developers should be fetched.
 * @param {Object} state
 * @returns {Boolean}
 */
function shouldFetchDevelopersCount(state) {
  return getDevelopersCount(state) == 0;
}

/**
 * @descriptin - Determine if the count of articles should be fetched.
 * @param {Object} state
 * @returns {Boolean}
 */
function shouldFetchArticlesCount(state) {
  return getArticlesCount(state) == 0;
}

/**
 * @description - Fetches the games count from our public API.
 * @returns {Function}
 */
function fetchGamesCount() {
  return (dispatch, getState) => {
    if (shouldFetchGamesCount(getState())) {
      dispatch(fetchGamesCountRequest());
      fetch(
        `${process.env.API_HOST}/v1/stat/game/count`,
        { method: 'GET' },
      )
        .then(response => response.json())
        .then(json => dispatch(fetchGamesCountResponse(json)))
        .catch(err => dispatch(fetchGamesCountResponse(err)));
    }
  };
}

/**
 * @description - Fetches the developers count from our public API.
 * @returns {Function}
 */
function fetchDevelopersCount() {
  return (dispatch, getState) => {
    if (shouldFetchDevelopersCount(getState())) {
      dispatch(fetchDevelopersCountRequest());
      fetch(
        `${process.env.API_HOST}/v1/stat/developer/count`,
        { method: 'GET' },
      )
        .then(response => response.json())
        .then(json => dispatch(fetchDevelopersCountResponse(json)))
        .catch(err => dispatch(fetchDevelopersCountResponse(err)));
    }
  };
}

/**
 * @description - Fetches the articles count from our public API.
 * @returns {Function}
 */
function fetchArticlesCount() {
  return (dispatch, getState) => {
    if (shouldFetchArticlesCount(getState())) {
      dispatch(fetchArticlesCountRequest());
      fetch(
        `${process.env.API_HOST}/v1/stat/article/count`,
        { method: 'GET' },
      )
        .then(response => response.json())
        .then(json => dispatch(fetchArticlesCountResponse(json)))
        .catch(err => dispatch(fetchArticlesCountResponse(err)));
    }
  };
}

/**
 * gamesCountRequested state field. Is true
 * while we're fetching for games count, and false
 * otherwise. Should be used to implement a spinner.
 */
const gamesCountRequested = handleActions({
  [fetchGamesCountRequest]() {
    return true;
  },
  [fetchGamesCountResponse]() {
    return false;
  },
}, false);

/**
 * developersCountRequested state field. Is true
 * while we're fetching for games count, and false
 * otherwise. Should be used to implement a spinner.
 */
const developersCountRequested = handleActions({
  [fetchDevelopersCountRequest]() {
    return true;
  },
  [fetchDevelopersCountResponse]() {
    return false;
  },
}, false);

/**
 * articlesCountRequested state field. Is true
 * while we're fetching for games count, and false
 * otherwise. Should be used to implement a spinner.
 */
const articlesCountRequested = handleActions({
  [fetchArticlesCountRequest]() {
    return true;
  },
  [fetchArticlesCountResponse]() {
    return false;
  },
}, false);

/**
 * gamesCountError state field. Set to the error
 * message whenever we get an error while
 * fetching for games count.
 */
const gamesCountError = handleActions({
  [fetchGamesCountResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    },
  },
}, null);

/**
 * developersCountError state field. Set to the error
 * message whenever we get an error while
 * fetching for developers count.
 */
const developersCountError = handleActions({
  [fetchDevelopersCountResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    },
  },
}, null);

/**
 * articlesCountError state field. Set to the error
 * message whenever we get an error while
 * fetching for articles count.
 */
const articlesCountError = handleActions({
  [fetchArticlesCountResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    },
  },
}, null);

/**
 * gamesCount state field. A number for the amount of
 * games in database as a state.
 */
const gamesCount = handleActions({
  [fetchGamesCountResponse]: {
    next(state, { payload }) {
      return Number(payload);
    },
    throw(state) {
      return state;
    },
  },
}, 0);

/**
 * developersCount state field. A number for the amount of
 * developers in database as a state.
 */
const developersCount = handleActions({
  [fetchDevelopersCountResponse]: {
    next(state, { payload }) {
      return Number(payload);
    },
    throw(state) {
      return state;
    },
  },
}, 0);

/**
 * articlesCount state field. A number for the amount of
 * articles in database as a state.
 */
const articlesCount = handleActions({
  [fetchArticlesCountResponse]: {
    next(state, { payload }) {
      return Number(payload);
    },
    throw(state) {
      return state;
    },
  },
}, 0);

/* The reducer for all of the gamesCount's related
 * state fields.
 */
const gamesCountReducer = combineReducers({
  gamesCount,
  gamesCountError,
  gamesCountRequested,
});

/* The reducer for all of the developersCount's related
 * state fields.
 */
const developersCountReducer = combineReducers({
  developersCount,
  developersCountError,
  developersCountRequested,
});

/* The reducer for all of the articlesCount's related
 * state fields.
 */
const articlesCountReducer = combineReducers({
  articlesCount,
  articlesCountError,
  articlesCountRequested,
});

const navbarReducer = combineReducers({
  games: gamesCountReducer,
  developers: developersCountReducer,
  articles: articlesCountReducer,
});

export {
  fetchGamesCount,
  fetchDevelopersCount,
  fetchArticlesCount,

  fetchGamesCountRequest,
  fetchGamesCountResponse,
  fetchDevelopersCountRequest,
  fetchDevelopersCountResponse,
  fetchArticlesCountRequest,
  fetchArticlesCountResponse,

  navbarReducer,
};
