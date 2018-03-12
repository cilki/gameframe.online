
/**
 * Actions file for a single developer
 */

import { createAction } from 'redux-actions';

import { getDeveloper } from './DeveloperSelectors';

const fetchDeveloperRequest = createAction('FETCH_DEVELOPER_REQUEST');
const fetchDeveloperResponse = createAction('FETCH_DEVELOPER_RESPONSE');

/**
 * @description - Predicate function that determines if we've already fetched the
 * developer given by their ID or not
 * @param {Object} state
 * @param {Number} id
 * @returns {Boolean}
 */
function shouldFetchDeveloper(state, id) {
  return getDeveloper(state, { id }) === null;
}

/**
 * @description - Thunk creator that dispatches a thunk to make an asynchronous call
 * to our own API in order to retrieve the developer given by their id
 * @param {Number} id
 * @returns {Function}
 */
function fetchDeveloper(id) {
  return (dispatch, getState) => {
    if (shouldFetchDeveloper(getState(), id)) {
      dispatch(fetchDeveloperRequest());
      fetch(`v1/developer/${id}`, { method: 'GET' }) //eslint-disable-line
        .then(response => response.json())
        .then(json => dispatch(fetchDeveloperResponse(json)))
        .catch(err => dispatch(fetchDeveloperResponse(err)));
    }
  };
}

export {
  fetchDeveloperRequest,
  fetchDeveloperResponse,

  fetchDeveloper,
};
