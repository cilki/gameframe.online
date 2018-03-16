
/**
 * Simple actions for a Article's instance page
 */

import { createAction } from 'redux-actions';

import { getArticle } from './ArticleSelectors';

const fetchArticleRequest = createAction('FETCH_ARTICLE_REQUEST');
const fetchArticleResponse = createAction(
  'FETCH_ARTICLE_RESPONSE',
  (articleId, data) => {
    let payload = { articleId, data };
    if (data instanceof Error) {
      payload = Object.assign(payload, { error: true });
    }
    return payload;
  },
);

/**
 * @description - Predicate function to determine if the given
 * article id should be fetched
 * @param {Object} state
 * @param {Number} articleId
 * @returns {Boolean}
 */
function shouldFetchArticle(state, articleId) {
  const result = getArticle(state, { id: articleId });
  return !result;
}

/**
 * @description - Requests from the API the article we want depending on the
 * returned value from the predicate. In redux jargon, a thunk creator
 * @param {Number} articleId
 * @returns {Function}
 */
function fetchArticle(articleId) {
  return (dispatch, getState) => {
    if (shouldFetchArticle(getState(), articleId)) {
      dispatch(fetchArticleRequest(articleId));
      fetch(`http://api.gameframe.online/v1/article/${articleId}`, { method: 'GET' }) //eslint-disable-line
        .then(response => response.json())
        .then(json => dispatch(fetchArticleResponse(articleId, json)))
        .catch(err => dispatch(fetchArticleResponse(articleId, err)));
    }
  };
}

export {
  fetchArticleRequest,
  fetchArticleResponse,

  fetchArticle,
};
