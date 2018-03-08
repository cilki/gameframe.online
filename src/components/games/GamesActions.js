
/**
 * Defines the actions for the Games page
 */

import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';

import {
  
} from './GamesSelectors';

const fetchGamesRequest = createAction("FETCH_GAMES_REQUEST");
const fetchGamesResponse = createAction("FETCH_GAMES_RESPONSE");

function fetchGames(pageNumber) {
    return (dispatch, getState) => {
        if (shouldFetchGames(pageNumber)) {
            dispatch(fetchGamesRequest());
            fetch(`/v1/game?page=${pageNumber}`, {method: 'GET'})
                .then(response => response.json())
                .then(json => dispatch(fetchGamesResponse(json)))
                .catch(err => dispatch(fetchGamesResponse(err)));
        }
    }
};

function shouldFetchGames(pageNumber) {
    return true;
};

const gamesRequested = handleActions({
    [fetchGamesRequest]() {
        return true;
    },
    [fetchGamesResponse]() {
        return false;
    },
}, false);

const gamesError = handleActions({
    [fetchGamesResponse]: {
        next() {
            return null;
        },
        throw(state, { payload: { message } }) {
            return message;
        },
    },
}, null);

const games = handleActions({
    [fetchGamesResponse]: {
        next(state, { payload }) {
            return List(payload.objects.map((game) => {
                return Map(game);
            }));
        },
        throw(state) {
            return state;
        },
    },
}, List());

const gamesReducer = combineReducers({
    games,
    gamesError,
    gamesRequested,
});

export {
    fetchGamesRequest,
    fetchGamesResponse,

    gamesReducer,
};
