
/**
 * Actions file for a single developer
 */

import { normalize } from 'normalizr';

import {
  fetchDeveloperRequest,
  fetchDeveloperResponse,
  fetchArticlesRequest,
  fetchGamesRequest,
} from '../Actions';
import { developers as developerSchema } from '../Schemas';
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
function fetchDeveloper(developerId) {
  return (dispatch, getState) => {
    if (shouldFetchDeveloper(getState(), developerId)) {
      dispatch(fetchDeveloperRequest(developerId));
      fetch(`http://api.gameframe.online/v1/developer/${developerId}`, { method: 'GET' }) //eslint-disable-line
        .then(response => response.json())
        .then(json => normalize(json, developerSchema))
        .then((data) => {
          dispatch(fetchGamesRequest(Object.values(data.entities.games)));
          dispatch(fetchArticlesRequest(Object.values(data.entities.articles)));
          dispatch(fetchDeveloperResponse(developerId, data.entities.developers[developerId]));
        })
        .catch(err => dispatch(fetchDeveloperResponse(developerId, err)));
    }
  };
}

export { fetchDeveloper }; //eslint-disable-line
