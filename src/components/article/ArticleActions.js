
/**
 * Simple actions for a Article's instance page
 */

import { normalize } from 'normalizr';

import {
  fetchArticleRequest,
  fetchArticleResponse,
  fetchDevelopersResponse,
  fetchGamesResponse,
} from '../Actions';
import { articles as articleSchema } from '../Schemas';
// import { getArticle } from './ArticleSelectors';

/**
 * @description - Predicate function to determine if the given
 * article id should be fetched
 * @param {Object} state
 * @param {Number} articleId
 * @returns {Boolean}
 */
function shouldFetchArticle(state, articleId) { //eslint-disable-line
  // const result = getArticle(state, { id: articleId });
  // return !result;
  return true;
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
        .then(json => normalize(json, articleSchema))
        .then((data) => {
          if (!data.entities) {
            return Promise.resolve();
          }
          if (data.entities.developers) {
            dispatch(fetchDevelopersResponse(Object.values(data.entities.developers)));
          }
          if (data.entities.games) {
            dispatch(fetchGamesResponse(Object.values(data.entities.games)));
          }
          if (data.entities.articles && data.entities.articles[articleId]) {
            dispatch(fetchArticleResponse(articleId, data.entities.articles[articleId]));
          }
          return Promise.resolve();
        })
        .catch(err => dispatch(fetchArticleResponse(articleId, err)));
    }
  };
}

export { fetchArticle }; //eslint-disable-line
