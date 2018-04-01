
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
  return state[props.model].filter;
}

/**
 * @description - Input selector for returning the options
 * to the filter react-select component
 * @param {Object} state
 * @param {Object} props
 * @returns {Array}
 */
function getFilterOptions(state, props) {
  if (props.model === 'games') {
    return [
      {
        label: 'Genre',
        value: 'genres',
        options: [
          { label: 'Action', value: 'Action', },
          { label: 'Point-and-click', value: 'Point-and-click', },
          { label: 'Fighting', value: 'Fighting', },
          { label: 'Shooter', value: 'Shooter', },
          { label: 'Racing', value: 'Racing', },
          { label: 'Free to Play', value: 'Free to Play', },
          { label: 'Music', value: 'Music', },
          { label: 'Platformer', value: 'Platformer', },
          { label: 'Real Time Strategy', value: 'Real Time Strategy', },
        ],
      },
    ];
  }
}

export {
  getFilterValue,
  getFilterOptions,
};
