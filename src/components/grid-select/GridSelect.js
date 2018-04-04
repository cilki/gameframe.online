
/**
 * A select component for the Grid
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Async } from 'react-select';
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
      type: PropTypes.string.isRequired,
      subfilterId: PropTypes.string.isRequired,
    })),

    setFilterValue: PropTypes.func.isRequired,
    getOptions: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  getOptions(value, currentValue, callback) {
    this.setState({
      isLoading: true,
    });

    const self = this;
    const _callback = (err, options) => {
      self.setState({
        isLoading: false,
      });
      callback(err, options);
    };

    this.props.getOptions(this.props.options, value, currentValue, _callback);
  }

  render() {
    return (
      <div
        style={{
          minWidth: '20%',
        }}
      >
        <Async
          placeholder={`Filter ${this.props.model}`}
          options={this.props.options}
          loadOptions={() => this.getOptions}
          onChange={(_value) => this.props.setFilterValue(_value)}
          value={this.props.value}
          multi
          cache={false}
          deepFilter
          closeOnSelect={false}
        />
      </div>
    );
  }
}

export default GridSelect;
