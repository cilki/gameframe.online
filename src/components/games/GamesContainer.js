
/**
 * Container file for Games.js.
 * Maps the actions for the Games page as well as necessary props/state
 */

import { connect } from 'react-redux';

import GamesPresenter from './Games';
import {
  getGamesRequested,
  getGamesByPage,
  getGamesError,
  getTotalPages,
  getGamesCurrentPage,
} from './GamesSelectors';
import { fetchGames } from './GamesActions';

/**
 * @description - Maps our redux state tree to
 * the props of the presenter
 * @param {Map} state - the current state in the Redux store
 * @param {Object} props
 * @returns {Object}
 */
function mapStateToProps(state, props) {
  return {
    gamesRequested: getGamesRequested(state),
    gamesError: getGamesError(state),
    // this automatically gets the current page from props
    games: getGamesByPage(state, props),
    totalPages: getTotalPages(state),
    currentPage: getGamesCurrentPage(state, props),
  };
}

/**
 * @description - Maps the dispatch function (for dispatching actions)
 * to the props of the presenter, which allows our presenter to dispatch
 * actions
 * @param {Function} dispatch
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    fetchGames: page => dispatch(fetchGames(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesPresenter);
export {
  mapStateToProps,
  mapDispatchToProps,
};
