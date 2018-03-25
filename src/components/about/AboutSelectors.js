
/**
 * Selectors for the state tree for About.js
 */

import { createSelector } from 'reselect';

/**
 * @description - Input selector for the contributors
 * 'requested' state
 * @param {Map} state
 * @returns {Boolean}
 */
function getContributorsRequested(state) {
  return state.about.contributorsRequested;
}


/**
 * @description - Input selector for the contributors
 * for the about page
 * @param {Map} state
 * @returns {List}
 */
function getAllContributors(state) {
  return state.about.contributors;
}

/**
 * @description - Trivial selector for finding the
 * error state of the contributors
 * @param {Map} state
 * @returns {String|null}
 */
function getContributorsError(state) {
  return state.about.contributorsError;
}

/**
 * @description - Memoized selector for the contributor's logins
 */
const getContributors = createSelector(
  [getAllContributors],
  (contributors) => {
    return contributors
      .map(contributor => contributor.get('login'))
      .sort((first, next) => {
        return (first > next) - (first < next);
      })
      .toJS();
  },
);

/**
 * @description - Input selector for the issues
 * 'requested' state
 * @param {Map} state
 * @returns {Boolean}
 */
function getIssuesRequested(state) {
  return state.about.issuesRequested;
}

/**
 * @description - Input selector for the issues
 * @param {Map} state
 * @returns {List}
 */
function getIssues(state) {
  return state.about.issues;
}

/**
 * @description - Trivial selector for finding the
 * error state of the issues
 * @param {Map} state
 * @returns {String|null}
 */
function getIssuesError(state) {
  return state.about.issuesError;
}

/**
 * @description - Input selector for the description
 * 'requested' state
 * @param {Map} state
 * @returns {Boolean}
 */
function getDescriptionRequested(state) {
  return state.about.descriptionRequested;
}


/**
 * @description - Input selector for the description
 * @param {Map} state
 * @returns {String|null}
 */
function getDescription(state) {
  return state.about.description;
}

/**
 * @description - Trivial selector for finding the
 * error state of the description
 * @param {Map} state
 * @returns {String|null}
 */
function getDescriptionError(state) {
  return state.about.descriptionError;
}

/**
 * @description - Input selector for the explanation
 * 'requested' state
 * @param {Map} state
 * @returns {Boolean}
 */
function getExplanationRequested(state) {
  return state.about.explanationRequested;
}


/**
 * @description - Input selector for the explanation
 * @param {Map} state
 * @returns {String|null}
 */
function getExplanation(state) {
  return state.about.explanation;
}

/**
 * @description - Trivial selector for finding the
 * error state of the explanation
 * @param {Map} state
 * @returns {String|null}
 */
function getExplanationError(state) {
  return state.about.explanationError;
}

/**
 * @description - Input selector for the tools
 * 'requested' state
 * @param {Map} state
 * @returns {Boolean}
 */
function getToolsRequested(state) {
  return state.about.toolsRequested;
}


/**
 * @description - Input selector for the tools
 * @param {Map} state
 * @returns {String|null}
 */
function getTools(state) {
  return state.about.tools;
}

/**
 * @description - Trivial selector for finding the
 * error state of the tools
 * @param {Map} state
 * @returns {String|null}
 */
function getToolsError(state) {
  return state.about.toolsError;
}

/**
 * @description - Returns the total number of issues
 * in Github
 * @returns {Function}
 */
const getTotalIssues = createSelector(
  [getIssues],
  (issues) => {
    return issues.size;
  },
);

/**
 * @description - Returns the total number of commits
 * in Github
 * @returns {Function}
 */
const getTotalCommits = createSelector(
  [getAllContributors],
  (contributors) => {
    let total = 0;
    contributors.forEach((contributor) => {
      const commits = contributor.get('commits');
      total += commits;
    });

    return total;
  },
);

/**
 * @description - Returns the total number of unit tests
 * @returns {Function}
 */
const getTotalUnitTests = createSelector(
  [getAllContributors],
  (contributors) => {
    let total = 0;
    contributors.forEach((contributor) => {
      const unitTests = contributor.get('unitTests');
      total += unitTests;
    });

    return total;
  },
);

export { //eslint-disable-line
  getContributorsRequested,
  getContributors,
  getAllContributors,
  getContributorsError,

  getIssuesRequested,
  getIssues,
  getIssuesError,

  getDescriptionRequested,
  getDescription,
  getDescriptionError,

  getExplanationRequested,
  getExplanation,
  getExplanationError,
  
  getToolsRequested,
  getTools,
  getToolsError,

  getTotalIssues,
  getTotalCommits,
  getTotalUnitTests,
};
