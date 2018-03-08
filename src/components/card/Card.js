/**
 * Card is a representations of an instance of a model.
 */

import React from 'react';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Card as CardStyles } from './CardStyles';


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
      hover: false
    };
  }

  /**
   * @description - 
   */

  /**
   * @description - 
   */

  render() {
    const { title } = this.props;
    return (
      <div style={[CardStyles.main]}>
        <Link to={this.props.url} style={{ textDecoration: 'none' }}>
          <div>
            <div style={[CardStyles.card]} key={title}>
              <div style={[CardStyles.imageContainerContainer]} key={`${title}-container`}>
                <div style={[CardStyles.imageContainer]} key={`${title}-image-container`}>
                  <img
                    style={[CardStyles.image]}
                    src={this.props.cover}
                    ref={img => this.img = img}
                    onError={
                    () => this.img.src = '../../static/images/noImage.png'
                  }
                  />
                </div>
              </div>
              <div style={[CardStyles.tooltip,
                this.state.hover && CardStyles.tooltip.hover
              ]}>
                <h3>{this.props.title}</h3><p>AAAAAAAAAAAAAA AAAAA AAAAAAAAAA AAAAAAAAAAAaaaaAAAaaaaA AAaaaA,
                aaAAaaaAA AAaA!
                </p>
              </div>
              <div style={[CardStyles.captionContainer]} key={`${title}-caption`}>
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
