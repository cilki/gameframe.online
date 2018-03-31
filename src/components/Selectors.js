
/**
 * A file of common selectors that need to be shared by many components
 */

/**
 * @description - Input selector for returning all of the games
 * @param {Object} state
 * @returns {Object}
 */
function getGames(state) {
  return state.games.models;
}

/**
 * @description - Input selector for returning all of the articles
 * @param {Object} state
 * @returns {Object}
 */
function getArticles(state) {
  return state.articles.models;
}

/**
 * @description - Input selector for returning all of the developers
 * @param {Object} state
 * @return {Object}
 */
function getDevelopers(state) {
  return state.developers.models;
}

export {
  getGames,
  getArticles,
  getDevelopers,
};
