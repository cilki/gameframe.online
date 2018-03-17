
/**
 * Selectors for a single article instance
 */

import { createSelector } from 'reselect';

import { getArticles } from '../articles/ArticlesSelectors';

/**
 * @description - Input selector for returning a single article
 * given the id prop
 * @param {Object} state
 * @param {Object} props
 * @param {Number} props.id
 * @returns {Object}
 */
function getArticle(state, { id }) {
  const articles = getArticles(state);
  return articles[id];
}

/**
 * @description - Memoized selector for a article
 * @returns {Function}
 */
function makeGetArticle() {
  return createSelector(
    [getArticle],
    article => article,
  );
}

/**
 * @description - Memoized selector for returning an article's developers
 */
function makeGetArticleDevelopers(_articleSelector = null) {
  const articleSelector = _articleSelector === null ? makeGetArticle() : _articleSelector;
  return createSelector(
    [articleSelector, getDevelopers],
    (article, developers) => {
      const articleDevelopers = [];
      if (article.developers) {
        article.developers.forEach((developerId) => {
          if (developerId >= 0 && developers[developerId]) {
            articleDevelopers.push({
              id: developerId,
              name: developers[developerId] ? developers[developerId].name : null,
            });
          }
        });
      }
      return articleDevelopers;
    },
  );
}

/**
 * @description - Memoized selector for returning an article's game
 */
function makeGetArticleGames(_articleSelector = null) {
  const articleSelector = _articleSelector === null ? makeGetArticle() : _articleSelector;
  return createSelector(
    [articleSelector, getGames],
    (article, game) => {
      const articleGames = [];
      if(article.games) {
        article.games.forEach((gameId) => {
          if(gameId >= 0 && games[gameId]) {
            articleGames.push({
              id: gameId,
              name: games[gameId] ? games[gameId].name : null,
            });
          }
        });
      }
      return articleGames;
    },
  );
}

export {
  getArticle,
  makeGetArticle,
  makeGetArticleDevelopers,
  makeGetArticleGames,
};
