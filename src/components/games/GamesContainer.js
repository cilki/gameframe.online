
/**
 * Container file for Games.js.
 * Maps the actions for the Games page as well as necessary props/state
 */

import { connect } from 'react-redux';
import QueryString from 'query-string';

import GamesPresenter from './Games';
import {
  getGamesRequested,
  getGames,
  getGamesError,
  getTotalPages,
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
  let { page } = QueryString.parse(props.location.search);
  page = Number(page);
  return {
    gamesRequested: getGamesRequested(state),
    gamesError: getGamesError(state),
    games: Object.values(getGames(state)),
    totalPages: getTotalPages(state),
    currentPage: isNaN(page) ? 1 : page, //eslint-disable-line
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
    fetchGames: () => dispatch(fetchGames()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesPresenter);
export {
  mapStateToProps,
  mapDispatchToProps,
};
