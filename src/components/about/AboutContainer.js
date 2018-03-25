
/**
 * Container file for About.js.
 * Maps the actions for the About page as well as necessary props/state
 */

import { connect } from 'react-redux';

import AboutPresenter from './About';
import {
  getContributorsRequested,
  getContributorsError,
  getContributors,
  getIssuesRequested,
  getIssuesError,
  getDescriptionRequested,
  getDescriptionError,
  getDescription,
  getExplanationRequested,
  getExplanationError,
  getExplanation,
  getToolsRequested,
  getToolsError,
  getTools,
  getTotalIssues,
  getTotalCommits,
  getTotalUnitTests,
} from './AboutSelectors';
import {
  fetchContributors,
  fetchIssues,
  fetchDescription,
  fetchExplanation,
  fetchTools,
} from './AboutActions';

/**
 * @description - Maps our redux state tree to
 * the props of the presenter
 * @param {Map} state - the current state in the Redux store
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    contributorsRequested: getContributorsRequested(state),
    contributorsError: getContributorsError(state),
    contributors: getContributors(state),

    issuesRequested: getIssuesRequested(state),
    issuesError: getIssuesError(state),

    descriptionRequested: getDescriptionRequested(state),
    descriptionError: getDescriptionError(state),
    description: getDescription(state),

    explanationRequested: getExplanationRequested(state),
    explanationError: getExplanationError(state),
    explanation: getExplanation(state),

    toolsRequested: getToolsRequested(state),
    toolsError: getToolsError(state),
    tools: getTools(state),

    totalIssues: getTotalIssues(state),
    totalCommits: getTotalCommits(state),
    totalUnitTests: getTotalUnitTests(state),
  };
}

/**
 * @description - Maps the dispatch function (for dispatching actions)
 * to the props of the presenter, which allows our presenter to dispatch
 * actions
 * @param {Function dispatch
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    fetchContributors: () => dispatch(fetchContributors()),
    fetchIssues: () => dispatch(fetchIssues()),

    fetchDescription: () => dispatch(fetchDescription()),
    fetchExplanation: () => dispatch(fetchExplanation()),
    fetchTools: () => dispatch(fetchTools()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPresenter);
export {
  mapStateToProps,
  mapDispatchToProps,
};
