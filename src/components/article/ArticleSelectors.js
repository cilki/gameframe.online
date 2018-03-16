
/**
 * Selectors for a single article instance
 */

import { createSelector } from 'reselect';

import { getArticles } from '../articles/ArticlesSelectors';

/**
 * @description - Input selector for returning a single article
 * given the id prop
 * @param {Object} state
 * @param {Object} props
 * @param {Number} props.id
 * @returns {Object}
 */
function getArticle(state, { id }) {
  const articles = getArticles(state);
  const article = articles.find(_article => _article.article_id === id);

  return article;
}

/**
 * @description - Memoized selector for a article
 * @returns {Function}
 */
function makeGetArticle() {
  return createSelector(
    [getArticle],
    article => article,
  );
}

export {
  getArticle,
  makeGetArticle,
};
