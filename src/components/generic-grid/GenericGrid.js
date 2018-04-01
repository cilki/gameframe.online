
/**
 * Generic grid presenter component
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import CommonAssets from '../../inline-styles';
import Grid from '../grid';

class GenericGrid extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    currentPage: PropTypes.number.isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      subfilter: PropTypes.string.isRequired,
    })),
    prefix: PropTypes.string.isRequired,
    totalPages: PropTypes.number.isRequired,

    fetchModels: PropTypes.func.isRequired,
  };

  static defaultProps = {
    children: [],
    filters: [],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description - React lifecycle method used to fetch the data
   */
  componentDidMount() {
    this.props.fetchModels(this.props.currentPage, this.props.filters);
  }

  /**
   * @description - React lifecycle method used to fetch the another
   * page if there's a page switch
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    console.log('this.props.filters', this.props.filters);
    if (prevProps.currentPage !== this.props.currentPage) {
      this.props.fetchModels(this.props.currentPage, this.props.filters);
    }
    else if (prevProps.filters.length !== this.props.filters.length) {
      console.log('fetching')
      this.props.fetchModels(this.props.currentPage, this.props.filters, true);
    }
  }

  render() {
    return (
      <div>
        <div
          style={[
            CommonAssets.fillBackground,
            CommonAssets.horizontalGradient,
          ]}
        />
        <div
          style={[
            CommonAssets.stripeOverlay,
            CommonAssets.fillBackground,
          ]}
        />
        <Grid
          {...{
            currentPage: this.props.currentPage,
            totalPages: this.props.totalPages,
            prefix: this.props.prefix,
          }}
        >
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default Radium(GenericGrid);
