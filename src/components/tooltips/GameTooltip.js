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
    genres: PropTypes.arrayOf(PropTypes.string),
    platforms: PropTypes.arrayOf(PropTypes.string),
    streams: PropTypes.number,
    videos: PropTypes.number,
    tweets: PropTypes.number,
    articles: PropTypes.number,
  };

  static defaultProps = {
    price: 0,
    genres: [],
    platforms: [],
    streams: 0,
    videos: 0,
    tweets: 0,
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
        <div>
          <p>
            Price:
            <Badge style={{
              marginLeft: '5%',
            }}
            >
              ${price}
            </Badge>
          </p>
        </div>

        <div>
          <h4>
            Genres:
          </h4>
          {
            this.props.genres.length > 0 &&
            <p style={{
              marginLeft: '5%',
            }}
            >
              {
              this.props.genres.map((genre) => {
                return (
                  <Label key={genre}>
                    {genre}
                  </Label>
                );
              })
            }
            </p>
          }
        </div>

        <div>
          <h4>
            Platforms
          </h4>
          <p>
            Windows:
            <Badge style={{
              marginLeft: '5%',
            }}
            >
              Yes
            </Badge>
          </p>
          <p>
            Mac:
            <Badge style={{
              marginLeft: '5%',
            }}
            >
              No
            </Badge>
          </p>
          <p>
            Linux:
            <Badge style={{
              marginLeft: '5%',
            }}
            >
              No
            </Badge>
          </p>
        </div>

        <div>
          <h4>
            Media
          </h4>
          <p>
            Streams:
            <Badge style={{
              marginLeft: '5%',
            }}
            >
              {this.props.streams}
            </Badge>
          </p>
          <p>
            Videos:
            <Badge style={{
              marginLeft: '5%',
            }}
            >
              {this.props.videos}
            </Badge>
          </p>
          <p>
            Tweets:
            <Badge style={{
              marginLeft: '5%',
            }}
            >
              {this.props.tweets}
            </Badge>
          </p>
          <p>
            Articles:
            <Badge style={{
              marginLeft: '5%',
            }}
            >
              {this.props.articles}
            </Badge>
          </p>
        </div>
      </div>
    );
  }
}

export default Radium(GameTooltip);
