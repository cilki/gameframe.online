
/**
 * Defines the actions for the Articles page
 */

import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';
import { normalize } from 'normalizr';

import {
  fetchArticlesRequest,
  fetchArticlesResponse,
  fetchArticleRequest,
  fetchArticleResponse,
  fetchGamesResponse,
  fetchDevelopersResponse,
} from '../Actions';
import { articles as articlesSchema } from '../Schemas';

/**
 * @description - Predicate function that takes the page number
 * and the state and determines if we need to fetch that particular page
 * @param {Object} state
 * @param {Number} pageNumber
 * @returns {Boolean}
 */
function shouldFetchArticles(state, pageNumber) { //eslint-disable-line
  // TODO: Implement this function so it's "smart"
  return true;
}

const articlesResponse = {
  objects: [ articlesSchema ],
};

/**
 * @description - Fetches the articles from our public API.
 * Technically, in Redux jargon, a thunk creator
 * given the page number
 * @param {Number} pageNumber
 * @returns {Function}
 */
function fetchArticles(pageNumber = 1) {
  return (dispatch, getState) => {
    if (shouldFetchArticles(getState(), pageNumber)) {
      dispatch(fetchArticlesRequest());
      fetch( //eslint-disable-line
        `http://api.gameframe.online/v1/article?page=${pageNumber}`,
        { method: 'GET' },
      )
        .then(response => response.json())
        .then(json => normalize(json, articlesResponse))
        .then((data) => {
          if (data.entities.games) {
            dispatch(fetchGamesResponse(Object.values(data.entities.games)));
          }
          if (data.entities.developers) {
            dispatch(fetchDevelopersResponse(Object.values(data.entities.developers)));
          }
          dispatch(fetchArticlesResponse(Object.values(data.entities.articles)));
        })
        .catch(err => dispatch(fetchArticlesResponse(err)));
    }
  };
}

/* articlesRequested state field. Is true
 * while we're fetching for articles, and false
 * otherwise. Should be used to implement a spinner */
const articlesRequested = handleActions({
  [fetchArticlesRequest]() {
    return true;
  },
  [fetchArticlesResponse]() {
    return false;
  },
}, false);

/* articlesError state field. Set to the error
 * message whenever we get an error while
 * fetching for articles */
const articlesError = handleActions({
  [fetchArticlesResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    },
  },
}, null);

/* articles state field. A list of the actual
 * state for our articles */
const articles = handleActions({
  [fetchArticlesResponse]: {
    next(state, { payload }) {
      const data = {};
      payload.forEach((article) => {
        data[article.article_id] = Object.assign({}, article,
          {
            requested: false,
            error: null,            
          },
          article.games && {
            games: List(article.games),
          },
          article.developers && {
            developers: List(article.developers),
          },
        );
      });

      return state.mergeDeep(data);
    },
    throw(state) {
      return state;
    },
  },

  // request for a single article
  [fetchArticleRequest](state, { payload }) {
    const id = payload;
    return state.mergeIn([id, 'requested'], true);
  },

  // response for a single article
  [fetchArticleResponse](state, { payload }) {
    const { id, data, error } = payload;

    if (error) {
      return state.mergeIn([id], {
        error: data.message,
        requested: false,
      });
    }

    /* data.games and data.developers
     * MUST be lists of ID's using normalizr */
    return state.mergeIn([id], Obect.assign({},
      data,
      {
        error: null,
        requested: false,
      },
      data.games && {
        games: List(data.games),
      },
      data.developers && {
        developers: List(data.developers),
      },
    ));
  }
}, Map());

/* The reduces for all of the article's related
 * state fields */
const articlesReducer = combineReducers({
  articles,
  articlesError,
  articlesRequested,
});

export {
  fetchArticles,
  articlesReducer,
};
