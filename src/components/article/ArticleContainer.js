
/**
 * Container for a single Article component, that represents a single
 * instance of a model
 */

import { connect } from 'react-redux';

import {
  makeGetArticle,
  makeGetArticleDevelopers,
  makeGetArticleGames,
} from './ArticleSelectors';
import { fetchArticle } from './ArticleActions';
import ArticlePresenter from './Article';

/**
 * @description - Maps the relevant data from the state container to the
 * relevant props in the React component
 * @returns {Function}
 */
function mapStateToProps() {
  const articleSelector = makeGetArticle();
  const developerSelector = makeGetArticleDevelopers(articleSelector);
  const gameSelector = makeGetArticleGames(articleSelector);
  return (state, { match: { params } }) => {
    // this is retrieving the ID from the URL
    const id = Number(params.articleId);
    if (isNaN(id)) { //eslint-disable-line
      return {};
    }

    const props = { id };
    const presenterProps = articleSelector(state, props);
    if (!presenterProps) {
      return {};
    }

    return Object.assign(
      presenterProps,
      {
        developers: developerSelector(state, props),
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
  const id = Number(params.articleId);
  return {
    fetchArticle: () => dispatch(fetchArticle(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePresenter);
