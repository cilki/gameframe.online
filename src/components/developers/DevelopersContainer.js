
/**
 * Container file for Developers.js.
 * Maps the actions for the Developers page as well as necessary props/state
 */

import { connect } from 'react-redux';

import DevelopersPresenter from './Developers';
import {

} from './DevelopersSelectors';
import {

} from './DevelopersActions';

/**
 * @description - Maps our redux state tree to
 * the props of the presenter
 * @param {Object} state - the current state in the Redux store
 * @returns {Object}
 */
function mapStateToProps() {
  return {

  };
}

/**
 * @description - Maps the dispatch function (for dispatching actions)
 * to the props of the presenter, which allows our presenter to dispatch
 * actions
 * @param {Function}
 * @returns {Object}
 */
function mapDispatchToProps() {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DevelopersPresenter);
