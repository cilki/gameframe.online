/**
 * Container file for About.js.
 * Maps the actions for the About page as well as necessary props or state.
 */

import { connect } from 'react-redux';
import {
  getContributorsRequested,
  getContributorsError,
  getContributors,
  getIssuesRequested,
  getIssuesError,
  getDescriptionRequested,
  getDescriptionError,
  getDescription,
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
  fetchTools,
} from './AboutActions';
import AboutPresenter from './About';

/**
 * @description - Maps our redux state tree to
 * the props of the presenter.
 * @param {Map} state - The current state in the Redux store.
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
 * actions.
 * @param {Function} dispatch
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    fetchContributors: () => dispatch(fetchContributors()),
    fetchIssues: () => dispatch(fetchIssues()),

    fetchDescription: () => dispatch(fetchDescription()),
    fetchTools: () => dispatch(fetchTools()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPresenter);
export {
  mapStateToProps,
  mapDispatchToProps,
};
