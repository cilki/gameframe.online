
/**
 * Container file for Developers.js.
 * Maps the actions for the Developers page as well as necessary props/state
 */

import { connect } from 'react-redux';

import DevelopersPresenter from './Developers';
import {
  getDevelopersRequested,
  getDevelopers,
  getDevelopersError,
} from './DevelopersSelectors';
import { fetchDevelopers } from './DevelopersActions';

/**
 * @description - Maps our redux state tree to
 * the props of the presenter
 * @param {Map} state - the current state in the Redux store
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    developersRequested: getDevelopersRequested(state),
    developersError: getDevelopersError(state),
    developers: Object.values(getDevelopers(state)),
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
    fetchDevelopers: () => dispatch(fetchDevelopers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DevelopersPresenter);
export {
  mapStateToProps,
  mapDispatchToProps,
};
