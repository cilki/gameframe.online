
/**
 * Container for a single Game component, that represents a single
 * instance of a model
 */

import { connect } from 'react-redux';

import {
  makeGetGame,
  makeGetGameGenres,
  makeGetGameDevelopers,
  makeGetGameArticles,
} from './GameSelectors';
import { fetchGame } from './GameActions';
import GamePresenter from './Game';

/**
 * @description - Maps the relevant data from the state container to the
 * relevant props in the React component
 * @returns {Function}
 */
function mapStateToProps() {
  const gameSelector = makeGetGame();
  const genreSelector = makeGetGameGenres(gameSelector);
  const developerSelector = makeGetGameDevelopers(gameSelector);
  const articleSelector = makeGetGameArticles(gameSelector);
  return (state, { match: { params } }) => {
    // this is retrieving the ID from the URL
    const id = Number(params.gameId);
    if (isNaN(id)) { //eslint-disable-line
      return {};
    }

    const props = { id };
    const presenterProps = gameSelector(state, props);
    if (!presenterProps) {
      return {};
    }

    return Object.assign(
      presenterProps,
      {
        genres: genreSelector(state, props),
        developers: developerSelector(state, props),
        articles: articleSelector(state, props),
      },
    );
  };
}

/**
 * @description - Matches the dispatch function to
 * relevant functions to allow the presenter component
 * to dispatch actions
 * @param {Function} dispatch
 * @param {Object} props
 * @returns {Object}
 */
function mapDispatchToProps(dispatch, { match: { params } }) {
  const id = Number(params.gameId);
  return {
    fetchGame: () => dispatch(fetchGame(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePresenter);
