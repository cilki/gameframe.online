
/**
 * Container file for Articles.js.
 * Maps the actions for the Articles page as well as necessary props/state
 */

import { connect } from 'react-redux';

import ArticlesPresenter from './Articles';
import {
  getArticlesRequested,
  getArticles,
  getArticlesError,
} from './ArticlesSelectors';
import { fetchArticles } from './ArticlesActions';

/**
 * @description - Maps our redux state tree to
 * the props of the presenter
 * @param {Map} state - the current state in the Redux store
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    articlesRequested: getArticlesRequested(state),
    articlesError: getArticlesError(state),
    articles: getArticles(state),
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
    fetchArticles: () => dispatch(fetchArticles()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPresenter);
export {
  mapStateToProps,
  mapDispatchToProps,
};
