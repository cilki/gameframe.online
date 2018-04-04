
/**
 * Defines funcitons that create the necessary pieces of actions for
 * a model
 */

import { normalize } from 'normalizr';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import QueryString from 'query-string';

import { PAGE_SIZE } from '../Constants';
import { setGridFilterAction, setGridFilterOptions } from '../grid-select';

/**
 * @description - Creates the predicate function to use
 * to determine to fetch a page or not of new models
 * @param {Function} selector - We'll feed the state into this function in addition to
 * the other arguments
 * @returns {Function}
 */
function createPredicate(selector) {
  return (state, pageNumber) => {
    return selector(state, { page: pageNumber }).length < PAGE_SIZE;
  };
}

/**
 * @description - Collects the filters within a format that's more useful
 * for passing them to Flask Restless
 * @param {Array} filters
 * @returns {Object}
 */
// function collectFilters(filters) {
//   const filterObject = {};
//   filters.forEach((filter) => {
//     const subfilterList = filterObject[filter.value]
//   });
//   return 
// }

/**
 * @description - Formats the filters into a string for Flask Restless
 * @param {Array} filters
 * @returns {Object}
 */
function formatFilters(filters) {
  return [{
    and: filters.map((filter) => {
      if (filter.type === 'array') {
        return {
          name: `${filter.value}__${filter.subfilterId}`,
          op: 'any',
          val: filter.subfilter,
        };
      }
      else if (filter.type === 'number') {
        const operator = filter.op === 'less than' ? 'leq' : 'geq';
        return {
          name: filter.value,
          op: operator,
          val: filter.subfilter,
        }
      }
      else if (filter.type === 'date') {
        const date = new Date();
        date.setFullYear(date.getFullYear() - filter.subfilter);
        const operator = filter.op === 'less than' ? 'leq' : 'geq';
        return {
          name: filter.value,
          op: operator,
          val: date.toISOString(),
        };
      }
    }),
  }];
}

/**
 * @description - Creates the function used to fetch pages of models
 * @param {Function} predicate - predicate function created from {@link createPredicate}
 * @param {Object} schema - A schema defined using normalizr standards
 * @param {String} pathname - the pathname to input into the API
 * @param {String} modelName - the name of the model as identified in the schema
 * @param {Object} actions - an object of actions that the thunk must dispatch.
 * This argument is deconstructed within the argument list
 * @param {Array} secondaryModels - a list of secondary models and actions associated
 * with them that allow us to store these other models in the store without making an extra fetch
 * @returns {Function}
 */
function createFetchModels(
  predicate,
  schema,
  pathname,
  modelName,
  {
    requestAction,
    responseAction,
    setPageAction,
    setTotalPageAction,
  },
  secondaryModels,
  defaultFilterOptions,
) {
  /**
   * @description - This is the actual fetch function/thunk creator we're returning
   * that produces thunks that can be dispatched to the redux store
   * @param {Number} pageNumber
   * @param {Array} filters
   * @param {Boolean} override
   * @returns {Function}
   */
  return (pageNumber = 1, filters = [], override = false) => {
    const queryObject = {};
    if (filters.length > 0) {
      queryObject.filters = formatFilters(filters);
    }

    /* We can put in more here, such as sorting and searching */

    let uri;
    if (Object.keys(queryObject) > 0) {
      uri = `${process.env.API_HOST}/v1/${pathname}?page=${pageNumber}&results_per_page=${PAGE_SIZE}`;
    }
    else {
      uri = `${process.env.API_HOST}/v1/${pathname}?q=${JSON.stringify(queryObject)}&page=${pageNumber}&results_per_page=${PAGE_SIZE}`;
    }
    /**
     * @description - This is the thunk itself, which dispatches it's own synchronous actions
     * as it resolves it's own asynchronous action
     * @param {Function} dispatch
     * @param {Function} getState
     */
    return (dispatch, getState) => {
      if (override || predicate(getState(), pageNumber)) {
        dispatch(requestAction());
        let page;
        return Promise.resolve(pageNumber)
          .then((_page) => {
            page = _page;
            return fetch( //eslint-disable-line
              encodeURI(uri),
              { method: 'GET' },
            )
          })
          .then(response => response.json())
          .then(json => normalize(json, schema))
          .then((data) => {
            if (data.result && data.result.total_pages !== undefined) {
              dispatch(setTotalPageAction(data.result.total_pages));
            }

            if (!data.entities) {
              dispatch(setPageAction({
                pageNumber: page,
                indices: [],
              }));
              return Promise.resolve();
            }

            secondaryModels.forEach(({
              secondaryModelName,
              secondaryModelResponseAction,
            }) => {
              if (data.entities[secondaryModelName]) {
                const actionData = Object.values(data.entities[secondaryModelName]);
                dispatch(secondaryModelResponseAction(actionData));
              }
            });

            if (data.entities[modelName]) {
              dispatch(responseAction(Object.values(data.entities[modelName])));
              dispatch(setPageAction({
                pageNumber: page,
                indices: Object.keys(data.entities[modelName]),
              }));
            }
            else {
              dispatch(setPageAction({
                pageNumber: page,
                indices: [],
              }));
            }

            return Promise.resolve();
          })
          .catch((err) => { console.error(err); dispatch(responseAction(err)); });
      }
      return Promise.resolve();
    };
  };
}

/**
 * @description - Creates the necessary reducers for actions that will be dispatched
 * @param {String} idName - the attribute that carries the ID of the model
 * @param {Function} singleRequest - the action for a single request of a model
 * @param {Function} singleResponse - the action for a single response of a model
 * @param {Function} multipleRequest - an action signifying the request of multiple instances
 * of a model
 * @param {Function} multipleResponse - an action signifying the response of multiple instances
 * of a model
 * @param {Function} setTotalPages - action that sets the total number of pages for a model
 * @param {Function} setSinglePage - an action that defines all of the indices within the
 * given page number, which is apart of the actions payload
 * @param {Array} secondaryModels - a list of secondary model names whose IDs get appended to
 * this models state tree
 * @returns {Function}
 */
function createReducer(
  idName,
  modelNamePlural,
  singleRequest,
  singleResponse,
  multipleRequest,
  multipleResponse,
  setSinglePage,
  setTotalPages,
  secondaryModels,
  defaultFilterOptions,
) {
  const models = handleActions({
    [multipleResponse]: {
      next(state, { payload }) {
        const data = {};
        payload.forEach((model) => {
          const dataArgs = [{}, model, { requested: false, error: null }];
          secondaryModels.forEach((secondaryModel) => {
            if (model[secondaryModel]) {
              dataArgs.push({ [secondaryModel]: model[secondaryModel] });
            }
          });

          data[model[idName]] = Object.assign.apply({}, dataArgs);
        });

        return Object.assign({}, state, data);
      },

      throw(state, { payload }) {
        console.error(payload); //eslint-disable-line
        return state;
      },
    },
    [singleRequest](state, { payload }) {
      const id = payload;

      if (state[id]) {
        const newIdState = Object.assign({}, state[id], { requested: true });
        return Object.assign({}, state, { id: newIdState });
      }
      return Object.assign({}, state, { id: { requested: true } });
    },

    [singleResponse](state, { payload }) {
      const { id, data, error } = payload;

      const newDataArgs = [
        {},
        data,
        {
          requested: false,
          error: error ? data.message : null,
        },
      ];

      if (error) {
        console.error(data); //eslint-disable-line
      } //eslint-disable-line
      else {
        secondaryModels.forEach((secondaryModel) => {
          if (data[secondaryModel]) {
            newDataArgs.push({
              [secondaryModel]: data[secondaryModel],
            });
          }
        });
      }

      const newStateArgs = [
        {},
        state,
        {
          [id]: Object.assign.apply({}, newDataArgs),
        },
      ];
      return Object.assign.apply({}, newStateArgs);
    },
  }, {});

  const requested = handleActions({
    [multipleRequest]() {
      return true;
    },
    [multipleResponse]() {
      return false;
    },
  }, false);

  const error = handleActions({
    [multipleResponse]: {
      next() {
        return null;
      },
      throw(state, { payload: { message } }) {
        return message;
      },
    },
  }, null);

  const totalPages = handleActions({
    [setTotalPages](state, { payload }) {
      return payload;
    },
  }, 0);

  const pages = handleActions({
    [setSinglePage](state, { payload: { pageNumber, indices } }) {
      return Object.assign({}, state, { [pageNumber]: indices });
    },
  }, {});

  const filters = handleActions({
    [setGridFilterAction](state, { payload }) {
      const { model, value } = payload;
      
      // ignore it if it wasn't meant for this model
      if (model !== modelNamePlural) {
        return state;
      }
      return value;
    }
  }, []);

  const filterOptions = handleActions({
    [setGridFilterOptions](state, { payload }) {
      const { model, value } = payload;

      //ignore it if it wasn't meant for this model
      if (model !== modelNamePlural) {
        return state;
      }
      return value;
    }
  }, defaultFilterOptions);

  return combineReducers({
    models,
    requested,
    error,
    totalPages,
    pages,
    filters,
    filterOptions,
  });
}

/**
 * @description - Used to reset the page whenever the user
 * is currently on a page that doesn't exist in the current filter's 
 * he/she's applied
 * @param {String} search - search string, retrieved from window.location.search
 * @param {Number} totalPages - the total pages that the latest request retrieved
 * @param {Function} push - a function retrieved from the ReactRouter, this allows
 * us to change the URL without causing a page load
 * @returns {Number} - the page number to fetch
 */
function resetPage(search, totalPages, push) {
  if (!search) {
    return;
  }
  const parsed = QueryString.parse(search);
  if (parsed.page > totalPages) {
    // minimum is 1
    parsed.page = totalPages ? totalPages : 1;
    push(`${window.location.pathname}?${QueryString.stringify(parsed)}`);
    return isNaN(Number(parsed.page)) ? null : Number(parsed.page);
  }
  return null;
}

export {
  createPredicate,
  createFetchModels,
  createReducer,
  resetPage,
};
