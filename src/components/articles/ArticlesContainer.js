
/**
 * Container file for Articles.js.
 * Maps the actions for the Articles page as well as necessary props/state
 */

import { connect } from 'react-redux';

import ArticlesPresenter from './Articles';
import {

} from './ArticlesSelectors';
import {

} from './ArticlesActions';

/**
 * @description - Maps our redux state tree to
 * the props of the presenter
 * @param {Map} state - the current state in the Redux store
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
 * @param {Function dispatch
 * @returns {Object}
 */
function mapDispatchToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPresenter);
