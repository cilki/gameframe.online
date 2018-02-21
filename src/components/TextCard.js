/**
 * Card is a representations of an instance of a model.
 */

import React from 'react';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { TextCard as TextCardStyles } from '../inline-styles/TextCardStyles';

/**
 * A single card instance within the InstanceGrid
 */
class TextCard extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      cover: this.props.cover,
      title: null,
      company: null,
      year: null,
      hover: false,
    };
  }

  /**
   * @description - React lifecycle method that is called whenever the
   * component will mount to the DOM
   */
  componentWillMount() {
    this.mouseEntry = this.mouseEntry.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  /**
   * @description - Event handler for the `mouseEntry` event
   */
  mouseEntry(e) {
    this.setState({ hover: true });
  }

  /**
   * @description - Event handler for the `mouseLeave` event
   */
  mouseLeave(e) {
    this.setState({ hover: false });
  }

  render() {
    return (
      <div style={[TextCardStyles.main]}>
        <Link to={this.props.url} style={{ textDecoration: 'none' }}>
          <div
            onMouseEnter={this.mouseEntry}
            onMouseLeave={this.mouseLeave}
          >
            <div style={[
              TextCardStyles.card,
              this.state.hover && TextCardStyles.card.hover,
            ]}
            >
              <div style={[
                TextCardStyles.imageContainer,
                this.state.hover && TextCardStyles.imageContainer.hover,
              ]}
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
