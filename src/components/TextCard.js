/**
 * Card is a representations of an instance of a model.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import TextCardStyles from '../inline-styles/TextCardStyles';

/**
 * A single card instance within the InstanceGrid
 */
class TextCard extends React.Component {
  static propTypes = {
    company: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string.isRequired,
    year: PropTypes.number,
  };

  static defaultProps = {
    company: null,
    title: null,
    year: 0,
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
      <div style={[TextCardStyles.main]}>
        <Link to={this.props.url} style={{ textDecoration: 'none' }}>
          <div>
            <div
              style={[
                TextCardStyles.card,
              ]}
              key={`${this.props.url}-card`}
            >
              <div
                style={[
                  TextCardStyles.imageContainer,
                ]}
                key={`${this.props.url}-image-container`}
              >
                <h2 style={[TextCardStyles.h2]}>{this.props.title}</h2>
              </div>
              <div style={[TextCardStyles.captionContainer]}>
                <div style={[TextCardStyles.caption]}>
                  <Label>
                    {this.props.company}
                  </Label>
                </div>
                <div style={[TextCardStyles.badgeContainer]}>
                  <Badge>
                    {this.props.year}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Radium(TextCard);
