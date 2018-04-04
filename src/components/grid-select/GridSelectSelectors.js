
/**
 * Selectors used for computing derived state for GridSelect
 */

/**
 * @description - input selector for retrieving the value of 
  * the filter for the given Grid
 * @param {Object} state
 * @param {Object} props
 * @returns {Array}
 */
function getFilterValue(state, props) {
  return state[props.model].filters;
}

/**
 * @description - Input selector for returning the options
 * to the filter react-select component
 * @param {Object} state
 * @param {Object} props
 * @returns {Array}
 */
function getFilterOptions(state, props) {
  return state[props.model].filterOptions;
}

export {
  getFilterValue,
  getFilterOptions,
};
