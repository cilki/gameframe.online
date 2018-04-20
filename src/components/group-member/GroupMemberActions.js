/**
 * Defines the actions for an individual group member.
 */

import { createAction } from 'redux-actions';
import { getContributor } from './GroupMemberSelectors';

const fetchStatsRequest = createAction('FETCH_STATS_REQUEST');
const fetchStatsResponse = createAction(
  'FETCH_STATS_RESPONSE',
  (login, data) => {
    let payload = { login, data };

    if (data instanceof Error) {
      payload = Object.assign(payload, { error: true });
    }
    return payload;
  },
);

/**
 * @description - Predicate to determine if we should fetch the stats
 * for a given contributor.
 * @param {String} login
 * @param {Object} state
 * @returns {Boolean}
 */
function shouldFetchStats(login, state) {
  const contributor = getContributor(state, { login });
  return contributor ? contributor.get('name') === undefined : false;
}

/**
 * @description - Fetches a file from the Flask webserver.
 * @param {String} url
 * @param {Function} predicate - Used to determine if the fetch is necessary.
 * @param {Function} requestAction
 * @param {Function} responseAction
 */
function fetchJSONFile(url, predicate, requestAction, responseAction) {
  return (dispatch, getState) => {
    if (predicate(getState())) {
      dispatch(requestAction());
      return fetch(url, { method: 'GET' }) //eslint-disable-line
        .then(response => response.json())
        .then(json => dispatch(responseAction(json)))
        .catch(err => dispatch(responseAction(err)));
    }
    return null;
  };
}

/**
 * @description - Fetches the stats with the given Github login.
 * @param {String} login
 * @returns {Function}
 */
function fetchGroupMemberStats(login) {
  const predicate = shouldFetchStats.bind({}, login);
  const url = `./static/data/contributors/${login}.json`;
  return fetchJSONFile(
    url,
    predicate,
    fetchStatsRequest.bind({}, login),
    fetchStatsResponse.bind({}, login),
  );
}

export { //eslint-disable-line
  fetchGroupMemberStats,
  fetchJSONFile,
  fetchStatsRequest,
  fetchStatsResponse,
  shouldFetchStats,
};
