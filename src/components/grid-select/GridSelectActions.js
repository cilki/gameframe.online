
/**
 * Actions for the GridSelect component
 */

import { createAction } from 'redux-actions';

const setGridFilterAction = createAction('SET_GRID_FILTER', (model, value) => { return { model, value, }; });

export {
  setGridFilterAction,
};
