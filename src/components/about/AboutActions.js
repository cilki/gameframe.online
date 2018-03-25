
/**
 * Defines the actions for the About page
 */

import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';

import {
  getAllContributors,
  getIssues,
  getDescription,
  getExplanation,
  getTools,
} from './AboutSelectors';
import {
  fetchStatsRequest,
  fetchStatsResponse,
} from '../group-member/GroupMemberActions';

const fetchContributorsRequest = createAction('FETCH_CONTRIBUTORS_REQUEST');
const fetchContributorsResponse = createAction('FETCH_CONTRIBUTORS_RESPONSE');

const fetchIssuesRequest = createAction('FETCH_ISSUES_REQUEST');
const fetchIssuesResponse = createAction('FETCH_ISSUES_RESPONSE');

const fetchDescriptionRequest = createAction('FETCH_DESCRIPTION_REQUEST');
const fetchDescriptionResponse = createAction('FETCH_DESCRIPTION_RESPONSE');

const fetchExplanationRequest = createAction('FETCH_EXPLANATION_REQUEST');
const fetchExplanationResponse = createAction('FETCH_EXPLANATION_RESPONSE');

const fetchToolsRequest = createAction('FETCH_TOOLS_REQUEST');
const fetchToolsResponse = createAction('FETCH_TOOLS_RESPONSE');

/**
 * @description - Creator of a thunk creator for fetching from the Github repo
 * @param {String} url
 * @param {Function} predicate - function that determines if the fetch is necessary.
 * This is required because many components will fetch on mount, and if the component
 * is mounted several times then this predicate will keep them from doing multiple fetches
 * @param {Function} requestAction
 * @param {Function} responseAction
 */
function fetchFromGithub(url, predicate, requestAction, responseAction) {
  return (dispatch, getState) => {
    if (predicate(getState())) {
      dispatch(requestAction());
      fetch(url, {method: 'GET'}) //eslint-disable-line
        .then(response => response.json())
        .then(json => dispatch(responseAction(json)))
        .catch(err => dispatch(responseAction(err)));
    }
  };
}

/**
 * @description - Creator of a thunk creator for fetching a text file
 * from the Flask webserver
 * @param {String} url
 * @param {Function} predicate - used to determine if the fetch is necessary
 * @param {Function} requestAction
 * @param {Function} responseAction
 */
function fetchFile(
  url,
  predicate,
  requestAction,
  responseAction,
  transform = response => response.text(),
) {
  return (dispatch, getState) => {
    if (predicate(getState())) {
      dispatch(requestAction());
      fetch(url, { method: 'GET' }) //eslint-disable-line
        .then(transform)
        .then(text => dispatch(responseAction(text)))
        .catch(err => dispatch(responseAction(err)));
    }
  };
}

/**
 * @description - Determines if the description needs to be fetched
 * @param {Map} state
 * @returns {Boolean}
 */
function shouldFetchDescription(state) {
  return getDescription(state) === null;
}

/**
 * @description - Determines if the explanation needs to be fetched
 * @param {Map} state
 * @returns {Boolean}
 */
function shouldFetchExplanation(state) {
  return getExplanation(state) === null;
}

/**
 * @description - Determines if the contributors have already been fetched, thus
 * won't re-fetch them
 * @param {Map} state - the state returned from `getState()`
 * @returns {Boolean}
 */
function shouldFetchContributors(state) {
  return getAllContributors(state).size <= 0;
}

/**
 * @description - Determines if the issues have already been fetched, thus
 * won't refetch them
 * @param {Map} state - the state returned from `getState()`
 * @returns {Boolean}
 */
function shouldFetchIssues(state) {
  return getIssues(state).size <= 0;
}

/**
 * @description - Determines if the tools have already been fetched, thus
 * won't refetch them
 * @param {Map} state - the state returned from `getState()`
 * @returns {Boolean}
 */
function shouldFetchTools(state) {
  return getTools(state).length <= 0;
}

/**
 * @description - Thunk creator, dispatches actions in order
 * to make an asyncronous action to retrieve the contributors
 * from the Github
 * @returns {Function}
 */
function fetchContributors() {
  return fetchFromGithub(
    'https://api.github.com/repos/cilki/gameframe.online/contributors',
    shouldFetchContributors,
    fetchContributorsRequest,
    fetchContributorsResponse,
  );
}

/**
 * @description - Thunk creator, dispatches actions in order
 * to make an asyncronous action to retrieve the issues
 * from the Github
 * @returns {Function}
 */
function fetchIssues() {
  return fetchFromGithub(
    'https://api.github.com/repos/cilki/gameframe.online/issues?state=all',
    shouldFetchIssues,
    fetchIssuesRequest,
    fetchIssuesResponse,
  );
}

/**
 * @description - Thunk creator, dispatches actions in order
 * to retrieve the description from Flask
 * @returns {Function}
 */
function fetchDescription() {
  return fetchFile(
    '/static/data/description.txt',
    shouldFetchDescription,
    fetchDescriptionRequest,
    fetchDescriptionResponse,
  );
}

/**
 * @description - Thunk creator, dispatches actions in order
 * to retrieve the explanation from Flask
 * @returns {Function}
 */
function fetchExplanation() {
  return fetchFile(
    '/static/data/explanation.txt',
    shouldFetchExplanation,
    fetchExplanationRequest,
    fetchExplanationResponse,
  );
}

/**
 * @description - Thunk creator, dispatches actions in order
 * to retrieve the tools from Flask
 * @returns {Function}
 */
function fetchTools() {
  return fetchFile(
    '/static/data/tools.json',
    shouldFetchTools,
    fetchToolsRequest,
    fetchToolsResponse,
    response => response.json(),
  );
}

//* ********************************************************
//                       REDUCERS
//* ********************************************************

/**
 * @description - Reducer for the 'requested' state
 * for the description
 */
const descriptionRequested = handleActions({
  [fetchDescriptionRequest]() {
    return true;
  },
  [fetchDescriptionResponse]() {
    return false;
  },
}, false);

/**
 * @description - Reducer for the 'error' state
 * for the description
 */
const descriptionError = handleActions({
  [fetchDescriptionResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    },
  },
}, null);

/**
 * @description - Reducer for the description of the website
 */
const description = handleActions({
  [fetchDescriptionResponse]: {
    next(state, { payload }) {
      return payload;
    },
    throw() {
      return null;
    },
  },
}, null);

/**
 * @description - Reducer for the 'requested' state of the
 * explanantion
 */
const explanationRequested = handleActions({
  [fetchExplanationRequest]() {
    return true;
  },
  [fetchExplanationResponse]() {
    return false;
  },
}, false);

/**
 * @description - Reducer for the 'error' state of the explanation
 */
const explanationError = handleActions({
  [fetchExplanationResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    },
  },
}, null);

/**
 * @description - Reducer for the explanation of the website
 */
const explanation = handleActions({
  [fetchExplanationResponse]: {
    next(state, { payload }) {
      return payload;
    },
    throw() {
      return null;
    },
  },
}, null);

/**
 * @description - Reducer for the 'requested' state for
 * the contributor's from Github
 */
const contributorsRequested = handleActions({
  [fetchContributorsRequest]() {
    return true;
  },
  [fetchContributorsResponse]() {
    return false;
  },
// default to false
}, false);

/**
 * @description - Reducer for the error state for
 * the fetching the contributors from Github
 */
const contributorsError = handleActions({
  [fetchContributorsResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    },
  },
}, null);

/**
 * @description - Reducer for the GIthub contributors
 */
const contributors = handleActions({
  [fetchContributorsResponse]: {
    next(state, { payload }) {
      // load all of the contributors into an immutable list
      return List(payload.map((user) => {
        return Map({
          login: user.login,
          commits: user.contributions,
          avatar: user.avatar_url,
        });
      }));
    },
    throw(state) {
      return state;
    },
  },

  [fetchStatsRequest](state, { payload }) {
    const login = payload;
    const index = state.findIndex(contributor => contributor.get('login') === login);

    if (index < 0) {
      return state;
    }
    return state.updateIn([index, 'statsRequest'], () => true);
  },

  [fetchStatsResponse](state, { payload }) {
    const { login, data, error } = payload;
    const index = state.findIndex(contributor => contributor.get('login') === login);

    if (index < 0) {
      return state;
    }

    if (error) {
      return state.mergeIn([index], {
        statsRequest: false,
        statsError: data.message,
      });
    } //eslint-disable-line

    return state.mergeIn([index], {
      statsRequest: false,
      name: data.name,
      bio: data.bio,
      responsibilities: data.responsibilities,
      unitTests: data.unitTests,
      statsError: null,
    });
  },
}, List());

/**
 * @description - Reducer for the 'requested' state for
 * the contributor's from Github
 */
const issuesRequested = handleActions({
  [fetchIssuesRequest]() {
    return true;
  },
  [fetchIssuesResponse]() {
    return false;
  },
// default to false
}, false);

/**
 * @description - Reducer for the error state for
 * the fetching the Issues from Github
 */
const issuesError = handleActions({
  [fetchIssuesResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    },
  },
}, null);

/**
 * @description - Reducer for the Github issues
 */
const issues = handleActions({
  [fetchIssuesResponse]: {
    next(state, { payload }) {
      // load all the issues into an immutable list
      return List(payload.map((issue) => {
        return Map({
          id: issue.id,
          user: issue.user.login,
        });
      }));
    },
    throw(state) {
      return state;
    },
  },
}, List());

/**
 * @description - Reducer for the 'requested' state for
 * tools
 */
const toolsRequested = handleActions({
  [fetchToolsRequest]() {
    return true;
  },
  [fetchToolsResponse]() {
    return false;
  },
// default to false
}, false);

/**
 * @description - Reducer for the error state for
 * the fetching of tools
 */
const toolsError = handleActions({
  [fetchToolsResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    },
  },
}, null);

/**
 * @description - Reducer for the tools
 */
const tools = handleActions({
  [fetchToolsResponse]: {
    next(state, { payload }) {
      return List(payload);
    },

    throw(state, { payload }) {
      console.error(payload); //eslint-disable-line
      return state;
    },
  },
}, List());

/**
 * @description - Combine our reducers into one, so that all of this
 * data can fall under a single state object within the hierarchy
 */
const aboutReducer = combineReducers({
  contributorsRequested,
  contributorsError,
  contributors,

  issuesRequested,
  issuesError,
  issues,

  descriptionRequested,
  descriptionError,
  description,

  explanationRequested,
  explanationError,
  explanation,

  toolsRequested,
  toolsError,
  tools,
});

export { //eslint-disable-line
  fetchContributors,
  fetchIssues,
  fetchDescription,
  fetchExplanation,
  aboutReducer,

  fetchFromGithub,
  fetchFile,
  shouldFetchDescription,
  shouldFetchExplanation,
  shouldFetchContributors,
  shouldFetchIssues,

  fetchDescriptionRequest,
  fetchDescriptionResponse,
  fetchExplanationRequest,
  fetchExplanationResponse,

  descriptionRequested,
  descriptionError,
  description,

  explanationRequested,
  explanationError,
  explanation,

  contributorsRequested,
  contributorsError,
  contributors,

  issuesRequested,
  issuesError,
  issues,

  shouldFetchTools,
  fetchTools,
  toolsRequested,
  toolsError,
  tools,
};
