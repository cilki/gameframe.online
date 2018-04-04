
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
      subfilter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })),
    prefix: PropTypes.string.isRequired,
    totalPages: PropTypes.number.isRequired,

    fetchModels: PropTypes.func.isRequired,
    resetPage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    children: [],
    filters: [],
  };

  static contextTypes = {
    router: PropTypes.object.isRequired, //eslint-disable-line
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  /**
   * @description - React lifecycle method used to fetch the data
   */
  componentDidMount() {
    this.props.fetchModels(
      this.props.currentPage,
      this.props.filters,
      { sortAttribute: this.props.sortAttribute, sortType: this.props.sortType }
    );
  }

  /**
   * @description - React lifecycle method used to fetch the another
   * page if there's a page switch
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (this.props.currentPage > 1 && this.props.currentPage > this.props.totalPages) {
      this.props.resetPage(
        this.props.totalPages,
        this.props.history.push,
        this.props.filters,
        {
          sortAttribute: this.props.sortAttribute,
          sortType: this.props.sortType,
        }
      );
    }

    if (prevProps.currentPage !== this.props.currentPage) {
      this.props.fetchModels(
        this.props.currentPage,
        this.props.filters,
        { sortType: this.props.sortType, sortAttribute: this.props.sortAttribute, },
      );
    }
    else if (prevProps.filters.length !== this.props.filters.length) {
      this.props.fetchModels(
        this.props.currentPage,
        this.props.filters,
        { sortType: this.props.sortType, sortAttribute: this.props.sortAttribute, },
        true
      );
    }

    if (prevProps.sortType !== this.props.sortType || prevProps.sortAttribute !== this.props.sortAttribute) {
      this.props.fetchModels(
        this.props.currentPage,
        this.props.filters,
        { sortType: this.props.sortType, sortAttribute: this.props.sortAttribute, },
        true
      );
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
