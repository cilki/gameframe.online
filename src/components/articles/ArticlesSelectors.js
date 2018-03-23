
/**
 * Selectors for the state tree for Articles.js
 */

import { createSelector } from 'reselect';
import QueryString from 'query-string';

/**
  * @description - Input selector for the articles
  * 'requested' state
  * @param {Map} state
  * @returns {Boolean}
  */
function getArticlesRequested(state) {
  return state.articles.articlesRequested;
}

/**
  * @description - Input selector for the articles
  * @param {Map} state
  * @returns {Boolean}
  */
function getArticles(state) {
  const articles = state.articles.articles.toJS();
  return articles;
}

/**
 * @description - Trivial selector for finding the
 * error state of the articles
 * @param {Map} state
 * @returns {String|null}
 */
function getArticlesError(state) {
  return state.articles.articlesError;
}

/**
 * @description - Input selector for the total pages for
 * the developers
 * @param {Object} state
 * @returns {Number}
 */
function getTotalPages(state) {
  return state.articles.totalPages;
}

/**
 * @description - Returns the current page for the games
 * @param {Object} state
 * @returns {Number}
 */
function getArticlesCurrentPage(state, props) {
  let page = props.page ? props.page : QueryString.parse(props.location.search).page;
  page = Number(page);

  return isNaN(page) ? 1 : page; //eslint-disable-line
}

/**
 * @description - Input selector for the
 * pages within games
 * @param {Object} state
 * @returns {Map}
 */
function getPages(state) {
  return state.articles.pages;
}

/* Returns the indices for a page */
const getPageIndices = createSelector(
  [getPages, getArticlesCurrentPage],
  (pages, currentPage) => {
    return pages.get(String(currentPage));
  },
);

/**
 * @description - Returns all of the games from a certain
 * page
 * @returns {Function}
 */
const getArticlesByPage = createSelector(
  [getArticles, getPageIndices],
  (articles, indices) => {
    const articlesToReturn = [];
    if (!indices) {
      return articlesToReturn;
    }

    indices.forEach((index) => {
      if (articles[index]) {
        articlesToReturn.push(articles[index]);
      }
    });

    return articlesToReturn;
  },
);

export { //eslint-disable-line
  getArticlesRequested,
  getArticles,
  getArticlesError,
  getTotalPages,
  getArticlesByPage,
  getArticlesCurrentPage,
};
