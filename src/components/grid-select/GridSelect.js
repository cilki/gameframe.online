
/**
 * A select component for the Grid
 */

import React from 'react';
import PropTypes from 'prop-types';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'; //eslint-disable-line
import 'react-virtualized-select/styles.css';

class GridSelect extends React.Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
      })),
      type: PropTypes.string.isRequired,
      subfilterId: PropTypes.string,
      op: PropTypes.string,
    })),
    value: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,

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

    this.getOptions = this.getOptions.bind(this);
  }

  getOptions(value, currentValue, callback) {
    this.setState({
      isLoading: true,
    });

    const optionsCallback = typeof currentValue === 'function' ? currentValue : callback;
    const filterCurrentValue = typeof currentValue === 'function' ? null : currentValue;
    const self = this;
    const callbackFunction = (err, options) => {
      self.setState({
        isLoading: false,
      });
      optionsCallback(err,
        {
          options,
        }
      );
    };

    this.props.getOptions(this.props.options, value, filterCurrentValue, callbackFunction);
  }

  render() {
    // console.log('this.props.options', this.props.options);
    return (
      <div
        style={{
          minWidth: '20%',
        }}
      >
        <VirtualizedSelect
          async
          placeholder={`Filter ${this.props.model}`}
          loadOptions={this.getOptions}
          onChange={_value => this.props.setFilterValue(_value)}
          value={this.props.value}
          multi
          isLoading={this.state.isLoading}
          cache={false}
          deepFilter
          closeOnSelect={false}
        />
      </div>
    );
  }
}

export default GridSelect;
