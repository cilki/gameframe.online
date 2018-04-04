
import { createAction } from 'redux-actions';

import Presenter from './Developers';
import { createContainer, createReducer } from '../generic-grid';
import { developers as developersSchema } from '../Schemas';
import {
  fetchDeveloperRequest,
  fetchDeveloperResponse,
  fetchDevelopersRequest,
  fetchDevelopersResponse,
  fetchGamesResponse,
  fetchArticlesResponse,
} from '../Actions';
import { developerFilters as defaultFilterOptions } from '../FilterOptions';

const developersResponse = { objects: [developersSchema] };
const setPageAction = createAction('SET_DEVELOPER_PAGE');
const setTotalPagesAction = createAction('SET_DEVELOPERS_TOTAL_PAGES');

const Developers = createContainer(
  Presenter,
  developersResponse,
  'developer',
  'developers',
  {
    requestAction: fetchDevelopersRequest,
    responseAction: fetchDevelopersResponse,
    setPageAction,
    setTotalPageAction: setTotalPagesAction,
  },
  [
    {
      secondaryModelName: 'games',
      secondaryModelResponseAction: fetchGamesResponse,
    },
    {
      secondaryModelName: 'articles',
      secondaryModelResponseAction: fetchArticlesResponse,
    },
  ],
);

export default Developers;
export const reducer = createReducer(
  'developer_id',
  'developers',
  fetchDeveloperRequest,
  fetchDeveloperResponse,
  fetchDevelopersRequest,
  fetchDevelopersResponse,
  setPageAction,
  setTotalPagesAction,
  ['games', 'articles'],
  defaultFilterOptions,
);

