
/**
 * Actions file for a single developer
 */


import {
  fetchDeveloperRequest,
  fetchDeveloperResponse,
} from '../Actions';
import { getDeveloper } from './DeveloperSelectors';


/**
 * @description - Predicate function that determines if we've already fetched the
 * developer given by their ID or not
 * @param {Object} state
 * @param {Number} id
 * @returns {Boolean}
 */
function shouldFetchDeveloper(state, id) {
  return !getDeveloper(state, { id });
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
      dispatch(fetchDeveloperRequest(id));
      fetch(`v1/developer/${id}`, { method: 'GET' }) //eslint-disable-line
        .then(response => response.json())
        .then(json => dispatch(fetchDeveloperResponse(id, json)))
        .catch(err => dispatch(fetchDeveloperResponse(id, err)));
    }
  };
}

export { fetchDeveloper }; //eslint-disable-line
