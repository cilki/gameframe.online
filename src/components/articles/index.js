
import { createAction } from 'redux-actions';

import Presenter from './Articles';
import { createContainer, createReducer } from '../generic-grid';
import { articles as articlesSchema } from '../Schemas';
import {
  fetchArticleRequest,
  fetchArticleResponse,
  fetchArticlesRequest,
  fetchArticlesResponse,
  fetchDevelopersResponse,
  fetchGamesResponse,
} from '../Actions';
import { articleFilters as defaultFilterOptions } from '../FilterOptions';

const articlesResponse = { objects: [articlesSchema] };
const setPageAction = createAction('SET_ARTICLE_PAGE');
const setTotalPagesAction = createAction('SET_ARTICLES_TOTAL_PAGES');

const Articles = createContainer(
  Presenter,
  articlesResponse,
  'article',
  'articles',
  {
    requestAction: fetchArticlesRequest,
    responseAction: fetchArticlesResponse,
    setPageAction,
    setTotalPageAction: setTotalPagesAction,
  },
  [
    {
      secondaryModelName: 'developers',
      secondaryModelResponseAction: fetchDevelopersResponse,
    },
    {
      secondaryModelName: 'games',
      secondaryModelResponseAction: fetchGamesResponse,
    },
  ],
);

export default Articles;
export const reducer = createReducer(
  'article_id',
  'articles',
  fetchArticleRequest,
  fetchArticleResponse,
  fetchArticlesRequest,
  fetchArticlesResponse,
  setPageAction,
  setTotalPagesAction,
  ['developers', 'games'],
  defaultFilterOptions,
  { label: 'Published', value: 'timestamp' },
);
