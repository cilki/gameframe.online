
/**
 * A container for the Grid Sort component
 */

import { connect } from 'react-redux';

import GridSort from './GridSort';
import {
  getSortType,
  getAttributeList,
  getCurrentAttribute,
} from './GridSortSelectors';
import { setGridSortCurrentAttribute, setGridSortType, } from './GridSortActions';

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
      attributeList: getAttributeList(state, props),
      currentAttribute: getCurrentAttribute(state, props),
      sortType: getSortType(state, props),
    };
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
  const setCurrentAttribute = setGridSortCurrentAttribute.bind({}, props.model);
  const setSortType = setGridSortType.bind({}, props.model);
  return {
    onChangeAttribute: (value) => dispatch(setCurrentAttribute(value)),
    onChangeOrdering: (type) => dispatch(setSortType(type)),
  };
}

export default connect(createMapStateToProps, mapDispatchToProps)(GridSort);
