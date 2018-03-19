
/**
 * Container file for Developers.js.
 * Maps the actions for the Developers page as well as necessary props/state
 */

import { connect } from 'react-redux';

import DevelopersPresenter from './Developers';
import {
  getDevelopersRequested,
  getDevelopersError,
  getDevelopersCurrentPage,
  getTotalPages,
  getDevelopersByPage,
} from './DevelopersSelectors';
import { fetchDevelopers } from './DevelopersActions';

/**
 * @description - Maps our redux state tree to
 * the props of the presenter
 * @param {Map} state - the current state in the Redux store
 * @returns {Object}
 */
function mapStateToProps(state, props) {
  return {
    developersRequested: getDevelopersRequested(state),
    developersError: getDevelopersError(state),
    developers: getDevelopersByPage(state, props),
    currentPage: getDevelopersCurrentPage(state, props),
    totalPages: getTotalPages(state),
  };
}

/**
 * @description - Maps the dispatch function (for dispatching actions)
 * to the props of the presenter, which allows our presenter to dispatch
 * actions
 * @param {Function dispatch}
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    fetchDevelopers: page => dispatch(fetchDevelopers(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DevelopersPresenter);
export {
  mapStateToProps,
  mapDispatchToProps,
};
