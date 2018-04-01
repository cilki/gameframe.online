
/**
 * A container for the GridSelect component
 */

import { connect } from 'react-redux';

import GridSelect from './GridSelect';
import {
  getFilterValue,
  getFilterOptions,
} from './GridSelectSelectors';
import { setGridFilterAction } from './GridSelectActions';

/**
 * @description - Function used to create a mapStateToProps function that
 * connect will use to hook up the relevant state to GridSelect
 * @returns {Function}
 */
function createMapStateToProps() {
  /**
   * @description - Map state to props function. Connect will call each of these in turn
   * @param {Object} state
   * @param {Object} props
   * @returns {Object}
   */
  return (state, props) => {
    return {
      value: getFilterValue(state, props),
      options: getFilterOptions(state, props),
    }
  };
}

/**
 * @description - Function responsible for mapping the redux dispatch function
 * to prop functions given to the presenter component
 * @param {Function} dispatch
 * @param {Object} props
 * @returns {Object}
 */
function mapDispatchToProps(dispatch, props) {
  const setFilterValue = setGridFilterAction.bind({}, props.model);
  return {
    setFilterValue: (value) => dispatch(setFilterValue(value)),
  };
}

export default connect(createMapStateToProps, mapDispatchToProps)(GridSelect);
