
/**
 * Selectors for a single game instance
 */

import { createSelector } from 'reselect';

import { getGames } from '../games/GamesSelectors.js';
import { getDeveloper } from '../developer/DeveloperSelectors';

/**
 * @description - Function that creates selectors for a developer's
 * name for a game. It doesn't care about all of the
 * state fields for a developer
 * @returns {Function}
 */
function makeGetDeveloperName() {
  return createSelector(
    [getDeveloper],
    (developer) => {
      return developer ? developer.get('name') : null;
    },
  );
}

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
  for (let game of games) {
    if (game.game_id === id) {
      return game;
    }
  }

  return null;
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

      return game !== null && game.genres !== undefined ? game.genres.split(',') : [];
    }
  );
}

export {
  makeGetDeveloperName,
  
  getGame,
  makeGetGame,
  makeGetGameGenres,
};
