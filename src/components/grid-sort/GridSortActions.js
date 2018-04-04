
/**
 * 
 */

import { createAction } from 'redux-actions';

const setGridSortCurrentAttribute = createAction('SET_GRID_SORT_ATTRIBUTE', (model, value) => { return { model, value, }; });
const setGridSortType = createAction('SET_GRID_SORT_TYPE',(model, value) => { return { model, value }; });

export {
  setGridSortCurrentAttribute,
  setGridSortType
};
