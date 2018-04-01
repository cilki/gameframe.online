
/**
 * A select component for the Grid
 */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class GridSelect extends React.Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })),
    })),

    setFilterValue: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: [],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          minWidth: '20%',
        }}
      >
        <h3>{'Filter'}</h3>
        <Select
          placeholder={`Filter ${this.props.model}`}
          options={this.props.options}
          onChange={(_value) => this.props.setFilterValue(_value)}
          value={this.props.value}
          multi
          deepFilter
        />
      </div>
    );
  }
}

export default GridSelect;
