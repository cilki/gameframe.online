
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
 * @param {Object} state
 * @returns {Boolean}
 */
function getDevelopersRequested(state) {
  return state.developers.developersRequested;
}

export {
  getAllDevelopers,
  getDevelopersRequested,
};
