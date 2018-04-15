/**
 * Container file for Navbar.js.
 * Maps the actions for the Navbar component as well as necessary props/state.
 */

import { connect } from 'react-redux';
import NavbarPresenter from './Navbar';
import {
  getGamesCountRequested,
  getDevelopersCountRequested,
  getArticlesCountRequested,
  getGamesCount,
  getDevelopersCount,
  getArticlesCount,
  getGamesCountError,
  getDevelopersCountError,
  getArticlesCountError,
} from './NavbarSelectors';
import {
  fetchGamesCount,
  fetchDevelopersCount,
  fetchArticlesCount,
} from './NavbarActions';

/**
 * @description - Maps our redux state tree to
 * the props of the presenter.
 * @param {Map} state - the current state in the Redux store.
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    gamesCountRequested: getGamesCountRequested(state),
    developersCountRequested: getDevelopersCountRequested(state),
    articlesCountRequested: getArticlesCountRequested(state),
    gamesCountError: getGamesCountError(state),
    developersCountError: getDevelopersCountError(state),
    articlesCountError: getArticlesCountError(state),
    gamesCount: getGamesCount(state),
    developersCount: getDevelopersCount(state),
    articlesCount: getArticlesCount(state),
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
    fetchGamesCount: () => dispatch(fetchGamesCount()),
    fetchDevelopersCount: () => dispatch(fetchDevelopersCount()),
    fetchArticlesCount: () => dispatch(fetchArticlesCount()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarPresenter);
export {
  mapStateToProps,
  mapDispatchToProps,
};
