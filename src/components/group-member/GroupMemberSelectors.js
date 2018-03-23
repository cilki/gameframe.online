
/**
 * Selectors for the GroupMember container
 */

import { createSelector } from 'reselect';

import { getAllContributors, getIssues } from '../about/AboutSelectors';

/**
 * @description - Helper function for retrieving a single contributor's
 * data from within the store
 * @param {Map} state - the current state tree
 * @param {Object} props - the component's passed down props
 * @returns {Map}
 */
function getContributor(state, props) {
  const contributors = getAllContributors(state);
  /* Even though we're composing another selector, we can't memoize this one
   * because this one still requires props. Thus the composition of
   * `getAllContributors()` is just a convenience for typing */
  const index = contributors.findIndex((contributor) => {
    return contributor.get('login') === props.login;
  });

  return index >= 0 ? contributors.get(index) : null;
}

/**
 * @description - Function that memoizes all of a contributor's relevant
 * attributes that can't be directly picked out from the store
 * @returns {Function}
 */
function makeGetContributor() {
  return createSelector(
    [getContributor, getIssues],
    (contributor, issues) => {
      if (contributor === null) {
        return null;
      }

      // This makes sure that we shove the issues in with the contributor
      return contributor.set(
        'issues',
        issues.filter(issue => issue.get('user') === contributor.get('login')).size,
      ).toJS();
    },
  );
}

export { //eslint-disable-line
  makeGetContributor,
  getContributor,
};
