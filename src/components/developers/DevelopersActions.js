
/**
 * Defines the actions for the Developers page
 */

import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';
import { normalize } from 'normalizr';

import {
  fetchDeveloperRequest,
  fetchDeveloperResponse,
  fetchDevelopersResponse,
  fetchDevelopersRequest,
  fetchGamesResponse,
  fetchArticlesResponse,
} from '../Actions';
import { developers as developersSchema } from '../Schemas';

/**
 * @description - Predicate function that takes the state and page number
 * and determines if we need to fetch that particular page
 * @param {Object} state
 * @param {Number} pageNumber
 * @returns {Boolean}
 */
function shouldFetchDevelopers(state, pageNumber) { //eslint-disable-line
  // TODO: Implement this function so it's "smart"
  return true;
}

const developersResponse = {
  objects: [ developersSchema ],
};

/**
 * @description - Fetches the developers from our public API.
 * Technically, in Redux jargon, a thunk creator
 * given the page number
 * @param {Number} pageNumber
 * @returns {Function}
 */
function fetchDevelopers(pageNumber = 1) {
  return (dispatch, getState) => {
    if (shouldFetchDevelopers(getState(), pageNumber)) {
  	  dispatch(fetchDevelopersRequest());
  	  fetch( //eslint-disable-line
  	    `http://api.gameframe.online/v1/developer?page=${pageNumber}`,
          { method: 'GET' },
  	  )
  	    .then(response => response.json())
        .then(json => normalize(json, developersResponse))
        .then((data) => {
          if (data.entities.games) {
            dispatch(fetchGamesResponse(Object.values(data.entities.games)));
          }
          if (data.entities.articles) {
            dispatch(fetchArticlesResponse(Object.values(data.entities.articles)));
          }
          dispatch(fetchDevelopersResponse(Object.values(data.entities.developers)));
        })
    		.catch(err => dispatch(fetchDevelopersResponse(err)));
    }
  };
}

/**
 * developersRequested state field. Is true
 * while we're fetching for developers, and false
 * otherwise. Should be used to implement a spinner
 */
const developersRequested = handleActions({
  [fetchDevelopersRequest]() {
    return true;
  },
  [fetchDevelopersResponse]() {
    return false;
  },
}, false);

/**
 * developersError state field. Set to the error
 * message whenever we get an error while
 * fetching for developers
 */
const developersError = handleActions({
  [fetchDevelopersResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
	  return message;
    },
  },
}, null);

/**
 * developers state field. A list of the actual
 * state for our developers
 */
const developers = handleActions({
  [fetchDevelopersResponse]: {
    next(state, { payload }) {
      const data = {};
      payload.forEach((developer) => {
        data[developer.developer_id] = Map(Object.assign({},
          developer,
          {
            error: null,
            requested: false,
          },
          developer.games && {
            games: List(data.games),
          },
          developer.articles && {
            articles: List(data.articles),
          },
        ));
      });

      return state.mergeDeep(data);
    },
    throw(state, { payload }) {
      console.error(payload);
      return state;
    },
  },

  // action for a single developer
  [fetchDeveloperRequest](state, { payload }) {
    const id = payload;
    return state.mergeIn([id, 'requested'], true);
  },

  // action for a single developer
  [fetchDeveloperResponse](state, { payload }) {
    const { id, data, error } = payload;

    if (error) {
      console.error(data);
      return state.mergeIn([index], {
        requested: false,
        error: data.message,
      });
    }

    /* data.games and data.articles
     * MUST be a list of ID's using normalizr */
    return state.mergeIn([id], Object.assign({},
      data,
      {
        requested: false,
        error: null,
      },
      data.games && {
        games: List(data.games),
      },
      data.articles && {
        articles: List(data.articles),
      },
    ));
  },
}, Map());

/**
 * The reducer for all of the developer's related
 * state fields
 */
const developersReducer = combineReducers({
  developers,
  developersError,
  developersRequested,
});

export {
  fetchDevelopers,

  fetchDevelopersRequest,
  fetchDevelopersResponse,

  developersReducer,
};
