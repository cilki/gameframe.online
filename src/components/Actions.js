
/**
 * A file for common actions that need to be shared
 * between many files. This is used because otherwise
 * we would have circular dependencies
 */

import { createAction } from 'redux-actions';

/**
 * @description - Common function used as a payload
 * creator for the response actions, because they all
 * use specific ID's to identify their state in the
 * store
 * @param {Number} id
 * @param {Object|Error} data
 * @returns {Object}
 */
function payloadCreator(id, data) {
  const payload = { id, data };

  if (data instanceof Error) {
    return Object.assign(payload, { error: true });
  }
  return payload;
}

const fetchDevelopersRequest = createAction('FETCH_DEVELOPERS_REQUEST');
const fetchDevelopersResponse = createAction('FETCH_DEVELOPERS_RESPONSE');

const fetchDeveloperRequest = createAction('FETCH_DEVELOPER_REQUEST');
const fetchDeveloperResponse = createAction('FETCH_DEVELOPER_RESPONSE', payloadCreator);

const fetchGamesRequest = createAction('FETCH_GAMES_REQUEST');
const fetchGamesResponse = createAction('FETCH_GAMES_RESPONSE');

const fetchGameRequest = createAction('FETCH_GAME_REQUEST');
const fetchGameResponse = createAction('FETCH_GAME_RESPONSE', payloadCreator);

const fetchArticlesRequest = createAction('FETCH_ARTICLES_REQUEST');
const fetchArticlesResponse = createAction('FETCH_ARTICLES_RESPONSE');

const fetchArticleRequest = createAction('FETCH_ARTICLE_REQUEST');
const fetchArticleResponse = createAction('FETCH_ARTICLE_RESPONSE', payloadCreator);


export {
  fetchDevelopersRequest,
  fetchDevelopersResponse,

  fetchDeveloperRequest,
  fetchDeveloperResponse,

  fetchGamesRequest,
  fetchGamesResponse,

  fetchGameRequest,
  fetchGameResponse,

  fetchArticlesRequest,
  fetchArticlesResponse,

  fetchArticleRequest,
  fetchArticleResponse,
};
