
/**
 * Selectors for a single Developer component
 */

import { createSelector } from 'reselect';

import { getAllDevelopers } from '../developers/DevelopersSelectors';

/**
 * @description - Input selector for a single developer
 * @param {Object} state
 * @param {Object} props
 * @param {Number} props.id - id number of the developer in question
 * @returns {Map}
 */
function getDeveloper(state, { id }) {
  const allDevelopers = getAllDevelopers(state);
  return allDevelopers[id];
}

/**
 * @description - Creates a memoized selector for
 * an individual developer to determine if they're
 * currently fetching the their data
 * @returns {Function}
 */
function makeGetDeveloperRequested() {
  return createSelector(
    [getDeveloper],
    (developer) => {
      return developer.get('requested');
    },
  );
}

export {
  getDeveloper,
  makeGetDeveloperRequested,
};
