
/**
 * Defines the actions for the Developers page
 */

import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';

import {

} from './DevelopersSelectors';

const fetchDevelopersRequest = createAction('FETCH_DEVELOPERS_REQUEST');
const fetchDevelopersResponse = createAction('FETCH_DEVELOPERS_RESPONSE');

/**
 * @description - Predicate function that takes the state and page number
 * and determines if we need to fetch that particular page
 * @param {Object} state
 * @param {Number} pageNumber
 * @returns {Boolean}
 */
function shouldFetchDevelopers(state, pageNumber) { //eslint-disable-line
  // TODO: Implement this function so it's "smart"
  return true;
}

/**
 * @description - Fetches the developers from our public API.
 * Technically, in Redux jargon, a thunk creator
 * given the page number
 * @param {Number} pageNumber
 * @returns {Function}
 */
function fetchDevelopers(pageNumber = 1) {
  return (dispatch, getState) => {
    if (shouldFetchDevelopers(getState(), pageNumber)) {
	  dispatch(fetchDevelopersRequest());
	  fetch( //eslint-disable-line
	    `http://api.gameframe.online/v1/developer?page=${pageNumber}`,
		{ method: 'GET' },
	  )
	    .then(response => response.json())
		.then(json => dispatch(fetchDevelopersResponse(json)))
		.catch(err => dispatch(fetchDevelopersResponse(err)));
	}
  };
}

/** 
 * developersRequested state field. Is true
 * while we're fetching for developers, and false
 * otherwise. Should be used to implement a spinner
 */
const developersRequested = handleActions({
  [fetchDevelopersRequest]() {
    return true;
  },
  [fetchDevelopersResponse]() {
    return false;
  },
}, false);

/**
 * developersError state field. Set to the error
 * message whenever we get an error while
 * fetching for developers
 */
const developersError = handleActions({
  [fetchDevelopersResponse]: {
    next() {
      return null;
	},
	throw(state, { payload: { message } }) {
	  return message;
	},
  },
}, null);

/**
 * developers state field. A list of the actual
 * state for our developers
 */
const developers = handleActions({
  [fetchDevelopersResponse]: {
    next(state, { payload }) {
	  return List(payload.objects.map((developer) => {
	    return Map(developer);
	  }));
	},
	throw(state) {
	  return state;
	},
  },
}, List());

/**
 * The reducer for all of the developer's related
 * state fields
 */
const developersReducer = combineReducers({
  developers,
  developersError,
  developersRequested,
});

export { 
  fetchDevelopers,
  
  fetchDevelopersRequest,
  fetchDevelopersResponse,
  
  developersReducer, 
};