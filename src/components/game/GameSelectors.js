
/**
 * Selectors for a single game instance
 */

import { createSelector } from 'reselect';

import {
  getGames,
  getArticles,
  getDevelopers,
} from '../Selectors';

/**
 * @description - Input selector for returning a single game
 * given the id prop
 * @param {Object} state
 * @param {Object} props
 * @param {Number} props.id
 * @returns {Object}
 */
function getGame(state, { id }) {
  const games = getGames(state);
  const game = games[id];
  return game;
}

/**
 * @description - Memoized selector for a game
 * @returns {Function}
 */
function makeGetGame() {
  return createSelector(
    [getGame],
    game => game,
  );
}

/**
 * @description - Memoized selector for returning the genre's
 * of a game
 * @return {Function}
 */
function makeGetGameGenres(_gameSelector = null) {
  const gameSelector = _gameSelector === null ? makeGetGame() : _gameSelector;
  return createSelector(
    [gameSelector],
    (game) => {
      return game && game.genres !== undefined ? game.genres.map(genre => genre.name) : [];
    },
  );
}

/**
 * @description - Memoized selector for returning a game's developers
 */
function makeGetGameDevelopers(_gameSelector = null) {
  const gameSelector = _gameSelector === null ? makeGetGame() : _gameSelector;
  return createSelector(
    [gameSelector, getDevelopers],
    (game, developers) => {
      const gameDevelopers = [];
      if (game.developers) {
        game.developers.forEach((developerId) => {
          if (developerId >= 0 && developers[developerId]) {
            gameDevelopers.push({
              id: developerId,
              name: developers[developerId] ? developers[developerId].name : null,
              logo: developers[developerId] ? developers[developerId].logo : null,
            });
          }
        });
      }
      return gameDevelopers;
    },
  );
}

/**
 * @description - Memoized selector for returning a game's articles
 */
function makeGetGameArticles(_gameSelector = null) {
  const gameSelector = _gameSelector === null ? makeGetGame() : _gameSelector;
  return createSelector(
    [gameSelector, getArticles],
    (game, articles) => {
      const gameArticles = [];
      if (game.articles) {
        game.articles.forEach((articleId) => {
          if (articleId >= 0 && articles[articleId]) {
            gameArticles.push({
              id: articleId,
              title: articles[articleId] ? articles[articleId].title : null,
              cover: articles[articleId] ? articles[articleId].cover : null,
            });
          }
        });
      }
      return gameArticles;
    },
  );
}

/**
 * @description - Memoized selector for a game's videos. Introduced for an extra
 * layer of memoization and perhaps less renderings
 * @param {Function=} [null] _gameSelector
 * @returns {Function=}
 */
function makeGetVideos(_gameSelector = null) {
  const gameSelector = _gameSelector === null ? makeGetGame() : _gameSelector;
  return createSelector(
    [gameSelector],
    (game) => {
      return game.videos;
    },
  );
}

export {
  getGame,
  makeGetGame,
  makeGetGameGenres,
  makeGetGameDevelopers,
  makeGetGameArticles,
};
