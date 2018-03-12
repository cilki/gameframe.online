
/**
 * Selectors for the state tree for Games.js
 */

/**
 * @description - Input selector for the games
 * 'requested' state
 * @param {Map} state
 * @returns {Boolean}
 */
function getGamesRequested(state) {
  return state.games.gamesRequested;
}


/**
   * @description - Input selector for the games
   * @param {Map} state
   * @returns {String|null}
   */
function getGames(state) {
  const games = state.games.games.toJS();
  return games;
}

/**
   * @description - Trivial selector for finding the
   * error state of the games
   * @param {Map} state
   * @returns {String|null}
   */
function getGamesError(state) {
  return state.games.gamesError;
}

export { //eslint-disable-line
  getGamesRequested,
  getGames,
  getGamesError,
};
