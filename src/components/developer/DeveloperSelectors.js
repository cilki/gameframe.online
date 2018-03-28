
/**
 * Selectors for a single Developer component
 */

import { createSelector } from 'reselect';

import { getGames } from '../games/GamesSelectors';
import { getDevelopers } from '../developers/DevelopersSelectors';
import { getArticles } from '../articles/ArticlesSelectors';

/**
 * @description - Input selector for returning a single developer
 * given the id prop
 * @param {Object} state
 * @param {Object} props
 * @param {Number} props.id
 * @returns {Object}
 */
function getDeveloper(state, { id }) {
  const allDevelopers = getDevelopers(state);
  const developer = allDevelopers[id];

  return developer;
}

/**
 * @description - Memoized selector for a developer
 * @returns {Function}
 */
function makeGetDeveloper() {
  return createSelector(
    [getDeveloper],
    developer => developer,
  );
}

/**
 * @description - Memoized selector for returning a developer's games
 */
function makeGetDeveloperGames(_developerSelector = null) {
  const developerSelector = _developerSelector === null ? makeGetDeveloper() : _developerSelector;
  return createSelector(
    [developerSelector, getGames],
    (developer, games) => {
      const developerGames = [];
      if (developer.games) {
        developer.games.forEach((gameId) => {
          if (gameId >= 0 && games[gameId]) {
            developerGames.push({
              id: gameId,
              name: games[gameId] ? games[gameId].name : null,
              cover: games[gameId] ? games[gameId].cover : null
            });
          }
        });
      }
      return developerGames;
    },
  );
}

function makeGetDeveloperArticles(_developerSelector = null) {
  const developerSelector = _developerSelector === null ? makeGetDeveloper() : _developerSelector;
  return createSelector(
    [developerSelector, getArticles],
    (developer, articles) => {
      const developerArticles = [];
      if (developer.articles) {
        developer.articles.forEach((articleId) => {
          if (articleId >= 0 && articles[articleId]) {
            developerArticles.push({
              id: articleId,
              title: articles[articleId] ? articles[articleId].title : null,
              cover: articles[articleId] ? articles[articleId].cover : null
            });
          }
        });
      }
      return developerArticles;
    },
  );
}

export {
  getDeveloper,
  makeGetDeveloper,
  makeGetDeveloperArticles,
  makeGetDeveloperGames,
};
