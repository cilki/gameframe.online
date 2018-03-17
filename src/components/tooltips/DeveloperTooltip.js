/**
 * DeveloperTooltip represents a snapshot of data for an
 * instance of a Developer's Card.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
/* import TooltipStyles from './TooltipStyles'; */

/**
 * A single card instance within the InstanceGrid
 */
class DeveloperTooltip extends React.Component {
  static propTypes = {
    articles: PropTypes.number,
    games: PropTypes.number,
    twitter: PropTypes.string,
    website: PropTypes.string,
  };

  static defaultProps = {
    articles: 0,
    games: 0,
    twitter: '',
    website: '',
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>Articles: #{this.props.articles}</div>
        <div>Games: #{this.props.games}</div>
        <div>Media</div>
        <div>Twitter: {this.props.twitter}</div>
        <div>Website: {this.props.website}</div>
      </div>
    );
  }
}

export default Radium(DeveloperTooltip);
