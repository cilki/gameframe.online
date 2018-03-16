
/**
 * Defines the actions for the Articles page
 */

import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';

import {

} from './ArticlesSelectors';

const fetchArticlesRequest = createAction('FETCH_ARTICLES_REQUEST');
const fetchArticlesResponse = createAction('FETCH_ARTICLES_RESPONSE');

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
        .then(json => dispatch(fetchArticlesResponse(json)))
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
      return List(payload.objects.map((article) => {
        return Map(article);
      }));
    },
    throw(state) {
      return state;
    },
  },
}, List());

/* The reduces for all of the article's related
 * state fields */
const articlesReducer = combineReducers({
  articles,
  articlesError,
  articlesRequested,
});

export {
  fetchArticles,

  fetchArticlesRequest,
  fetchArticlesResponse,

  articlesReducer,
};
