
/**
 * Selectors for the state tree for Developers.js
 */

/**
 * @description - Simple input selector for all of the developers
 * @param {Object} state
 * @returns {List}
 */
function getAllDevelopers(state) {
  return state.developers.developers;
}

/**
 * @description - Simple input selector for the `developersRequested` state
 * @param {Map} state
 * @returns {Boolean}
 */
function getDevelopersRequested(state) {
  return state.developers.developersRequested;
}

/**
 * @description - Input selector for the developers
 * @param {Map} state
 * @returns {String|null}
 */
function getDevelopers(state) {
  const developers = state.developers.developers.toJS();
  return developers;
}

/**
 * @description - Trivial selector for finding the
 * error state of the developers
 * @param {Map} state
 * @returns {String|null}
 */
function getDevelopersError(state) {
  return state.developers.developersError;
}

export {
  getAllDevelopers,
  getDevelopersRequested,
  getDevelopers,
  getDevelopersError,
};
