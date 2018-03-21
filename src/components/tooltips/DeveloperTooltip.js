/**
 * DeveloperTooltip represents a snapshot of data for an
 * instance of a Developer's Card.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TooltipsStyles from './TooltipsStyles';
/* import TooltipStyles from './TooltipStyles'; */

class DeveloperTooltip extends React.Component {
  static propTypes = {
    games: PropTypes.number,
    articles: PropTypes.number,
    twitter: PropTypes.string,
    website: PropTypes.string,
  };

  static defaultProps = {
    games: 0,
    articles: 0,
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
        <div>
          <h4>
            Statistics
          </h4>
          <div>
            <p>
              Games:
              <Badge style={{
                marginLeft: '5%'
              }}>
                {this.props.games}
              </Badge>
            </p>
          </div>

          <div>
            <p>
              Articles:
              <Badge style={{
                marginLeft: '5%'
              }}>
                {this.props.articles}
              </Badge>
            </p>
          </div>
        </div>

        <div>
          <h4>
            Media
          </h4>
          <p>
            Twitter:
            <a href={this.props.twitter}>
              <Label style={{
                marginLeft: '5%'
              }}>
                {this.props.twitter}
              </Label>
            </a>
          </p>
          <p>
            Website:
            <a href={this.props.website}>
              <Label style={{
                marginLeft: '5%'
              }}>
                {this.props.website}
              </Label>
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Radium(DeveloperTooltip);
