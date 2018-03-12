
/**
 * Selectors for a single game instance
 */

import { createSelector } from 'reselect';

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

export { makeGetDeveloperName }; //eslint-disable-line
