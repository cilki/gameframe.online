/**
 * Selectors for the state tree for Navbar.js
 */

/**
 * @description - Input selector for the gamesCount
 * 'requested' state.
 * @param {Map} state
 * @returns {Boolean}
 */
function getGamesCountRequested(state) {
  return state.navbar.games.gamesCountRequested;
}

/**
 * @description - Input selector for the developersCount
 * 'requested' state.
 * @param {Map} state
 * @returns {Boolean}
 */
function getDevelopersCountRequested(state) {
  return state.navbar.developers.developersCountRequested;
}

/**
 * @description - Input selector for the articlesCount
 * 'requested' state.
 * @param {Map} state
 * @returns {Boolean}
 */
function getArticlesCountRequested(state) {
  return state.navbar.articles.articlesCountRequested;
}

/**
 * @description - Input selector for the gamesCount.
 * @param {Map} state
 * @returns {String|null}
 */
function getGamesCount(state) {
  const gamesCount = state.navbar.games.gamesCount;
  return gamesCount;
}

/**
 * @description - Input selector for the developersCount.
 * @param {Map} state
 * @returns {String|null}
 */
function getDevelopersCount(state) {
  const developersCount = state.navbar.developers.developersCount;
  return developersCount;
}

/**
 * @description - Input selector for the articlesCount.
 * @param {Map} state
 * @returns {String|null}
 */
function getArticlesCount(state) {
  const articlesCount = state.navbar.articles.articlesCount;
  return articlesCount;
}

/**
 * @description - Trivial selector for finding the
 * error state of the gamesCount.
 * @param {Map} state
 * @returns {String|null}
 */
function getGamesCountError(state) {
  return state.navbar.games.gamesCountError;
}

/**
 * @description - Trivial selector for finding the
 * error state of the developersCount.
 * @param {Map} state
 * @returns {String|null}
 */
function getDevelopersCountError(state) {
  return state.navbar.developers.developersCountError;
}

/**
 * @description - Trivial selector for finding the
 * error state of the articlesCount.
 * @param {Map} state
 * @returns {String|null}
 */
function getArticlesCountError(state) {
  return state.navbar.articles.articlesCountError;
}

export {
  getGamesCountRequested,
  getDevelopersCountRequested,
  getArticlesCountRequested,
  getGamesCount,
  getDevelopersCount,
  getArticlesCount,
  getGamesCountError,
  getDevelopersCountError,
  getArticlesCountError,
};
