
/**
 * Component that implements the controls for
 * grid sorting
 */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

/**
 * @description - Functional, stateless component that implements
 * sorting
 * @param {Object} props
 * @param {Array} props.attributeList - list of attributes to sort on
 * @param {String} props.currentAttribute - the current attribute to use
 * @param {String} props.sortType - the way to sort (ascending, descending)
 */
function GridSort({
  attributeList,
  currentAttribute,
  sortType,
  onChangeAttribute,
  onChangeOrdering,
}) {

  return (
    <div
      style={{
        minWidth: '100%',
        display: 'flex',
        marginLeft: '5px',
      }}
    >
      <h4>
        Sort&nbsp;
      </h4>
      <div
        style={{flex: 1}}
      >
      <Select
        options={attributeList}
        onChange={onChangeAttribute}
        placeholder="Sort By..."
        value={currentAttribute}
        style={{borderTopRightRadius: '0', borderBottomRightRadius: '0'}}
      />
      </div>
      <div
        style={{flex: 1}}
      >
      <Select
        disabled={currentAttribute === null}
        options={[{ label: 'Ascending', value: 'asc', }, { label: 'Descending', value: 'desc', }]}
        onChange={onChangeOrdering}
        placeholder="Ascending/Descending"
        value={sortType}
        style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', marginLeft: '-1px', paddingLeft: '1px'}}
      />
      </div>
    </div>
  );
}

GridSort.propTypes = {
  attributeList: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  currentAttribute: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  model: PropTypes.string.isRequired,
  sortType: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),

  onChangeOrdering: PropTypes.func.isRequired,
  onChangeAttribute: PropTypes.func.isRequired,
};

GridSort.defaultProps = {
  attributeList: [],
  currentAttribute: null,
  sortType: null,
};

export default GridSort;
