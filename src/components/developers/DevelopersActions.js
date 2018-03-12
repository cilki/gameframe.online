
/**
 * Defines the actions for the Developers page
 */

import { handleActions } from 'redux-actions';
import { List } from 'immutable';
import { combineReducers } from 'redux';

import {

} from './DevelopersSelectors';

const developers = handleActions({

}, List());

const developersReducer = combineReducers({
  developers,
});

export { developersReducer, }; //eslint-disable-line
