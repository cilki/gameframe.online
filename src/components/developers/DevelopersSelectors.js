
/**
 * Selectors for the state tree for Developers.js
 */

import QueryString from 'query-string';
import { createSelector } from 'reselect';

/**
 * @description - Simple input selector for the `developersRequested` state
 * @param {Map} state
 * @returns {Boolean}
 */
function getDevelopersRequested(state) {
  return state.developers.developersRequested;
}

/**
 * @description - Input selector for the developers
 * @param {Map} state
 * @returns {String|null}
 */
function getDevelopers(state) {
  const developers = state.developers.developers.toJS();
  return developers;
}

/**
 * @description - Trivial selector for finding the
 * error state of the developers
 * @param {Map} state
 * @returns {String|null}
 */
function getDevelopersError(state) {
  return state.developers.developersError;
}

/**
 * @description - Total page selector for developers
 * @param {Object} state
 * @returns {Number}
 */
function getTotalPages(state) {
  return state.developers.totalPages;
}

/**
 * @description - Returns the current page for the games
 * @param {Object} state
 * @returns {Number}
 */
function getDevelopersCurrentPage(state, props) {
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
  return state.developers.pages;
}

/* Returns the indices for a page */
const getPageIndices = createSelector(
  [getPages, getDevelopersCurrentPage],
  (pages, currentPage) => {
    return pages.get(String(currentPage));
  },
);

/**
 * @description - Returns all of the games from a certain
 * page
 * @returns {Function}
 */
const getDevelopersByPage = createSelector(
  [getDevelopers, getPageIndices],
  (developers, indices) => {
    const developersToReturn = [];
    if (!indices) {
      return developersToReturn;
    }

    indices.forEach((index) => {
      if (developers[index]) {
        developersToReturn.push(developers[index]);
      }
    });

    return developersToReturn;
  },
);


export {
  getDevelopersRequested,
  getDevelopers,
  getDevelopersError,
  getTotalPages,
  getDevelopersCurrentPage,
  getDevelopersByPage,
};
