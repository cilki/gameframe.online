/**
 * ArticleTooltip represents a snapshot of data for an
 * instance of a Article's Card.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Label } from 'react-bootstrap';
/* import TooltipStyles from './TooltipStyles'; */

class ArticleTooltip extends React.Component {
  static propTypes = {
    games: PropTypes.arrayOf(PropTypes.number),
    developers: PropTypes.arrayOf(PropTypes.number),
    article_link: PropTypes.string,
  };

  static defaultProps = {
    games: [],
    developers: [],
    article_link: '',
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
            Games:
          </h4>
          {
            this.props.games.length > 0 &&
            <p style={{
              marginLeft: '5%',
            }}
            >
              {
              this.props.games.map((game) => {
                return (
                  <Label key={game}>
                    {game.name}
                  </Label>
                );
              })
            }
            </p>
          }
        </div>

        <div>
          <h4>
            Developers:
          </h4>
          {
            this.props.developers.length > 0 &&
            <p style={{
              marginLeft: '5%',
            }}
            >
              {
              this.props.developers.map((developer) => {
                return (
                  <Label key={developer}>
                    {developer.name}
                  </Label>
                );
              })
            }
            </p>
          }
        </div>

        <div>
          <h4>
            Media
          </h4>
          <p>
            Source:
            <a href={this.props.article_link}>
              <Label style={{
                marginLeft: '5px',
              }}
              >
                {this.props.article_link}
              </Label>
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Radium(ArticleTooltip);
