
/**
 * Container file for Games.js.
 * Maps the actions for the Games page as well as necessary props/state
 */

import { connect } from 'react-redux';

import GamesPresenter from './Games';
import {
  getGamesRequested,
  getGames,
  getGamesError,
} from './GamesSelectors';
import { fetchGames } from './GamesActions';

/**
 * @description - Maps our redux state tree to
 * the props of the presenter
 * @param {Map} state - the current state in the Redux store
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    gamesRequested: getGamesRequested(state),
    gamesError: getGamesError(state),
    games: getGames(state),
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
    fetchGames: () => dispatch(fetchGames()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesPresenter);
export {
  mapStateToProps,
  mapDispatchToProps,
};
