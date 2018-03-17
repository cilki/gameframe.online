/**
 * ArticleTooltip represents a snapshot of data for an
 * instance of a Article's Card.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
/* import TooltipStyles from './TooltipStyles'; */

class ArticleTooltip extends React.Component {
  static propTypes = {
    games: PropTypes.number,
    developers: PropTypes.number,
    outlet: PropTypes.string,
  };

  static defaultProps = {
    games: 0,
    developers: 0,
    outlet: '',
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
        <div>Games: <Badge>Game</Badge></div>
        <div>Developers: <Badge>Developer</Badge></div>
        <div>Media</div>
        <div>Source: {this.props.outlet}</div>
      </div>
    );
  }
}

export default Radium(ArticleTooltip);
