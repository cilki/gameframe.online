/**
 * GameTooltip represents a snapshot of data for an
 * instance of a Game's Card.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
/* import TooltipStyles from './TooltipStyles'; */

class GameTooltip extends React.Component {
  static propTypes = {
    price: PropTypes.number,
    articles: PropTypes.number,
  };

  static defaultProps = {
    price: 0,
    articles: 0,
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const price = this.props.price / 100;
    return (
      <div>
        <div>Price: ${price}</div>
        <div>Genres: <Badge>Genre</Badge></div>
        <div>Platforms</div>
        <div>Windows: Yes</div>
        <div>Mac: No</div>
        <div>Linux: No</div>
        <div>Media</div>
        <div>Streams: #0</div>
        <div>Videos: #0</div>
        <div>Tweets: #0</div>
        <div>Articles: #{this.props.articles}</div>
      </div>
    );
  }
}

export default Radium(GameTooltip);
