
/**
 * Container for a single Game component, that represents a single
 * instance of a model
 */

import { connect } from 'react-redux';

import {
  makeGetDeveloper,
  makeGetDeveloperArticles,
  makeGetDeveloperGames,
} from './DeveloperSelectors';
import { fetchDeveloper } from './DeveloperActions';
import DeveloperPresenter from './Developer';

/**
 * @description - Maps the relevant data from the state container to the
 * relevant props in the React component
 * @returns {Function}
 */
function mapStateToProps() {
  const developerSelector = makeGetDeveloper();
  const articleSelector = makeGetDeveloperArticles(developerSelector);
  const gameSelector = makeGetDeveloperGames(developerSelector);
  return (state, { match: { params } }) => {
    // this is retrieving the ID from the URL
    const id = Number(params.gameId);
    if (isNaN(id)) { //eslint-disable-line
      return {};
    }

    const props = { id };
    const presenterProps = developerSelector(state, props);
    if (!presenterProps) {
      return {};
    }

    return Object.assign(
      presenterProps,
      {
        articles: articleSelector(state, props),
        games: gameSelector(state, props),
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
  const id = Number(params.developerId);
  return {
    fetchDeveloper: () => dispatch(fetchDeveloper(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperPresenter);
