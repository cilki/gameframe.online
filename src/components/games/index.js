
import { createAction } from 'redux-actions';

import Presenter from './Games';
import { createContainer, createReducer } from '../generic-grid';
import { games as gamesSchema } from '../Schemas';
import {
  fetchGameRequest,
  fetchGameResponse,
  fetchGamesRequest,
  fetchGamesResponse,
  fetchDevelopersResponse,
  fetchArticlesResponse,
} from '../Actions';
import { gameFilters as defaultFilterOptions } from '../FilterOptions';

const gamesResponse = { objects: [gamesSchema] };
const setPageAction = createAction('SET_GAME_PAGE');
const setTotalPagesAction = createAction('SET_GAMES_TOTAL_PAGES');

const Games = createContainer(
  Presenter,
  gamesResponse,
  'game',
  'games',
  {
    requestAction: fetchGamesRequest,
    responseAction: fetchGamesResponse,
    setPageAction,
    setTotalPageAction: setTotalPagesAction,
  },
  [
    {
      secondaryModelName: 'developers',
      secondaryModelResponseAction: fetchDevelopersResponse,
    },
    {
      secondaryModelName: 'articles',
      secondaryModelResponseAction: fetchArticlesResponse,
    },
  ],
);

export default Games;
export const reducer = createReducer(
  'game_id',
  'games',
  fetchGameRequest,
  fetchGameResponse,
  fetchGamesRequest,
  fetchGamesResponse,
  setPageAction,
  setTotalPagesAction,
  ['developers', 'articles'],
  defaultFilterOptions,
);
