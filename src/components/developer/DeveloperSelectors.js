
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
  if (id < 0) {
    return null;
  }

  const allDevelopers = getAllDevelopers(state);
  const developer = allDevelopers.find((_developer) => {
    return _developer.get('id') === id;
  });

  return developer || null;
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
