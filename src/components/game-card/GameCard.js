
/**
 * A thin wrapper around Card for Games, which will help
 * to retrieve stateful information that the Games component
 * has no business fetching
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../card';

class GameCard extends Component {
  static propTypes = {
    developer: PropTypes.number,
    developerName: PropTypes.string,
    cover: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    year: PropTypes.number,

    fetchDeveloper: PropTypes.func.isRequired,
  };

  static defaultProps = {
    developer: -1,
    developerName: null,
    cover: null,
    title: null,
    url: null,
    year: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description - Lifecycle method used to retrieve any state that hasn't been given
   * from the props
   */
  componentDidMount() {
    this.props.fetchDeveloper();
  }

  /**
   * @description - Lifecycle method used to detect when props have changed (such as an error
   * to actual data) and retrieves any other state that may also need to be retrieved.
   * Note that this method will only fire on MOUNTED components (thus `componentWillMount()`
   * has already been called)
   * @param {Object} nextProps - the new props object
   * @param {Integer} nextProps.developer - the deconstructed id for the developer. We'll have to
   * check if this changed from -1 before we decide if we need to fetch the developer
   */
  componentWillReceiveProps({ developer }) {
    if (this.props.developer === -1 && this.props.developer !== developer) {
      /* Note that the action will still check if we've already fetched the developer, so
       * several layers of making sure we don't refetch if we don't have to */
      this.props.fetchDeveloper();
    }
  }

  render() {
    const {
      fetchDeveloper,
      developer,
      developerName,
      ...rest
    } = this.props;

    return (
      <Card
        company={developerName}
        {...rest}
      />
    );
  }
}

export default GameCard;
