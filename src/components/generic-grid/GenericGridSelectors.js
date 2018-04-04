
/**
 * Defines functions that create the generic selectors for a grid
 * page
 */

import QueryString from 'query-string';
import { createSelector } from 'reselect';

/**
 * @description - Creates all the necessary selectors for a model
 * @param {String} modelName - the name of the model
 * @returns {Object}
 */
function createSelectors(modelName) {
  /**
   * @description - Input selector for the state
   * of the request of the models
   * @param {Object} state
   * @returns {Boolean}
   */
  const getRequested = (state) => {
    return state[modelName].requested;
  };

  /**
   * @description - Input selector for the state
   * of the error of the models
   * @param {Object} state
   * @returns {String}
   */
  const getError = (state) => {
    return state[modelName].error;
  };

  /**
   * @description - Input selector for all of the models within
   * the state tree
   * @param {Object} state
   * @returns {Object}
   */
  const getModels = (state) => {
    return state[modelName].models;
  };

  /**
   * @description - Returns the current page from the props
   * using `QueryString.Parse()`
   * @param {Object} state
   * @param {Object} props
   * @returns {Number}
   */
  const getCurrentPage = (state, props) => {
    let page = props.page ? props.page : QueryString.parse(props.location.search).page;

    page = Number(page);
    return isNaN(page) ? 1 : page; //eslint-disable-line
  };

  /**
   * @description - Input selector for the total number
   * of pages for a model
   * @param {Object} state
   * @returns {Number}
   */
  const getTotalPages = (state) => {
    return state[modelName].totalPages;
  };

  /**
   * @description - Input selector for all of the pages
   * of indices for a model
   * @param {Object} state
   * @returns {Object}
   */
  const getPages = (state) => {
    return state[modelName].pages;
  };

  /* Memoized selector for retrieving the indices for
   * a particular page */
  const getPageIndices = createSelector(
    [getPages, getCurrentPage],
    (pages, currentPage) => {
      return pages[currentPage];
    },
  );

  /**
   * @description - Input selector for retrieving the filters
   * for this model
   * @param {Object} state
   * @returns {Array}
   */
  const getFilters = (state) => {
    return state[modelName].filters
      .map((filter) => {
        if (!(typeof filter.value === 'object')) {
          return null;
        }
        return filter.value;
      })
      .filter(_filter => _filter !== null);
  };

  /**
   * @description - Input selector for the sort type
   * @param {Object} state
   * @returns {String}
   */
  const getSortType = (state) => {
    return state[modelName].sortType;
  };

  /**
   * @description - Input selector for the sort attribute
   * @param {Object} state
   * @returns {String}
   */
  const getSortAttribute = (state) => {
    return state[modelName].currentSortAttribute;
  };

  /* Memoized selector for retrieving the models within
   * the current page */
  const getModelsByPage = createSelector(
    [getModels, getPageIndices],
    (models, indices) => {
      const modelsToReturn = [];
      if (!indices) {
        return modelsToReturn;
      }

      indices.forEach((index) => {
        if (models[index]) {
          modelsToReturn.push(models[index]);
        }
      });
      return modelsToReturn;
    },
  );

  return {
    getRequested,
    getError,
    getModels,
    getCurrentPage,
    getTotalPages,
    getPages,
    getPageIndices,
    getModelsByPage,
    getFilters,
    getSortType,
    getSortAttribute,
  };
}

export default createSelectors;
