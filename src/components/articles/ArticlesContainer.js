
/**
 * Container file for Articles.js.
 * Maps the actions for the Articles page as well as necessary props/state
 */

import { connect } from 'react-redux';

import ArticlesPresenter from './Articles';
import {
  getArticlesRequested,
  getArticlesError,
  getArticlesCurrentPage,
  getTotalPages,
  getArticlesByPage,
} from './ArticlesSelectors';
import { fetchArticles } from './ArticlesActions';

/**
 * @description - Maps our redux state tree to
 * the props of the presenter
 * @param {Map} state - the current state in the Redux store
 * @returns {Object}
 */
function mapStateToProps(state, props) {
  return {
    articlesRequested: getArticlesRequested(state),
    articlesError: getArticlesError(state),
    articles: getArticlesByPage(state, props),
    currentPage: getArticlesCurrentPage(state, props),
    totalPages: getTotalPages(state),
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
    fetchArticles: page => dispatch(fetchArticles(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPresenter);
export {
  mapStateToProps,
  mapDispatchToProps,
};
