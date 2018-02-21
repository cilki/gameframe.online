/**
 * Card is a representations of an instance of a model.
 */

import React from 'react';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Card as CardStyles } from '../inline-styles/CardStyles';


/**
 * A single card instance within the InstanceGrid
 */
class Card extends React.Component {
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
      <div style={[CardStyles.main]}>
        <Link to={this.props.url} style={{ textDecoration: 'none' }}>
          <div
            onMouseEnter={this.mouseEntry}
            onMouseLeave={this.mouseLeave}
          >
            <div style={[
              CardStyles.card,
              this.state.hover && CardStyles.card.hover,
            ]}
            >
              <div style={[
                CardStyles.imageContainer,
                this.state.hover && CardStyles.imageContainer.hover,
              ]}
              >
                <img
                  style={[
                  CardStyles.image,
                  this.state.hover && CardStyles.image.hover,
                ]}
                  src={this.props.cover}
                  ref={img => this.img = img}
                  onError={
                  () => this.img.src = '../../static/images/noImage.png'
                }
                />
              </div>
              <div style={[CardStyles.captionContainer]}>
                <div style={[CardStyles.caption]}>
                  <Label>
                    {this.props.company}
                  </Label>
                </div>
                <div style={[CardStyles.badgeContainer]}>
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

export default Radium(Card);
