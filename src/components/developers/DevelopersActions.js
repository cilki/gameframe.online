
/**
 * Defines the actions for the Developers page
 */

import { handleActions, createAction } from 'redux-actions';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';
import { normalize } from 'normalizr';

import { PAGE_SIZE } from '../Constants';
import {
  fetchDeveloperRequest,
  fetchDeveloperResponse,
  fetchDevelopersResponse,
  fetchDevelopersRequest,
  fetchGamesResponse,
  fetchArticlesResponse,
} from '../Actions';
import { getDevelopersByPage } from './DevelopersSelectors';
import { developers as developersSchema } from '../Schemas';

/**
 * @description - Predicate function that takes the state and page number
 * and determines if we need to fetch that particular page
 * @param {Object} state
 * @param {Number} pageNumber
 * @returns {Boolean}
 */
function shouldFetchDevelopers(state, pageNumber) { //eslint-disable-line
  return getDevelopersByPage(state, { page: pageNumber }).length < PAGE_SIZE;
}

const setDevelopersTotalPages = createAction('SET_DEVELOPERS_TOTAL_PAGES');
const setDeveloperPage = createAction('SET_DEVELOPER_PAGE');

const developersResponse = {
  objects: [developersSchema],
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
        encodeURI(`http://api.gameframe.online/v1/developer?page=${pageNumber}&results_per_page=${PAGE_SIZE}`),
        { method: 'GET' },
      )
        .then(response => response.json())
        .then(json => normalize(json, developersResponse))
        .then((data) => {
          if (data.result && data.result.total_pages) {
            dispatch(setDevelopersTotalPages(data.result.total_pages));
          }

          if (data.entities && data.entities.games) {
            dispatch(fetchGamesResponse(Object.values(data.entities.games)));
          }
          if (data.entities && data.entities.articles) {
            dispatch(fetchArticlesResponse(Object.values(data.entities.articles)));
          }
          if (data.entities && data.entities.developers) {
            dispatch(fetchDevelopersResponse(Object.values(data.entities.developers)));

            dispatch(setDeveloperPage({
              pageNumber,
              indices: Object.keys(data.entities.developers),
            }));
          }
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
 * Reducer for the total number of pages of developers
 * we have in the API
 */
const totalPages = handleActions({
  [setDevelopersTotalPages](state, { payload }) {
    return payload;
  },
}, 0);

const pages = handleActions({
  [setDeveloperPage](state, { payload: { pageNumber, indices } }) {
    return state.merge({ [pageNumber]: List(indices) });
  },
}, Map());

/**
 * developers state field. A list of the actual
 * state for our developers
 */
const developers = handleActions({
  [fetchDevelopersResponse]: {
    next(state, { payload }) {
      const data = {};
      payload.forEach((developer) => {
        data[developer.developer_id] = Map(Object.assign(
          {},
          developer,
          {
            error: null,
            requested: false,
          },
          developer.games && {
            games: List(developer.games),
          },
          developer.articles && {
            articles: List(developer.articles),
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

  // action for a single developer
  [fetchDeveloperRequest](state, { payload }) {
    const id = payload;
    return state.mergeIn([String(id)], {
      requested: true,
    });
  },

  // action for a single developer
  [fetchDeveloperResponse](state, { payload }) {
    const { id, data, error } = payload;

    if (error) {
      console.error(data); //eslint-disable-line
      return state.mergeIn([String(id)], {
        requested: false,
        error: data.message,
      });
    }

    /* data.games and data.articles
     * MUST be a list of ID's using normalizr */
    return state.mergeIn([id], Object.assign(
      {},
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
  totalPages,
  pages,
});

export {
  shouldFetchDevelopers,
  fetchDevelopers,
  developersRequested,
  developersError,
  developersReducer,
};
