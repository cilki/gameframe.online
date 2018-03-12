/**
 * Card is a representations of an instance of a model.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CardStyles from './CardStyles';


/**
 * A single card instance within the InstanceGrid
 */
class Card extends React.Component {
  static propTypes = {
    cover: PropTypes.string,
    company: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    year: PropTypes.number,
  };

  static defaultProps = {
    cover: null,
    company: null,
    year: new Date().getFullYear(),
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  /**
   * @description - Mouse entry event handler
   */
  onMouseEntry() {
    this.setState({
      hover: true,
    });
  }

  /**
   * @description - Mouse leave event handler
   */
  onMouseLeave() {
    this.setState({
      hover: false,
    });
  }

  render() {
    const { title } = this.props;
    const imageCover = this.props.cover !== null && this.props.cover.search('http') < 0 ?
      `https://${this.props.cover}` : this.props.cover;

    return (
      <div
        style={[CardStyles.main]}
        onMouseEnter={() => this.onMouseEntry}
        onMouseLeave={() => this.onMouseLeave}
      >
        <Link to={this.props.url} style={{ textDecoration: 'none' }}>
          <div>
            <div style={[CardStyles.card]} key={title}>
              <div style={[CardStyles.imageContainerContainer]} key={`${title}-container`}>
                <div style={[CardStyles.imageContainer]} key={`${title}-image-container`}>
                  <img
                    style={[CardStyles.image]}
                    src={imageCover || '../../static/images/noImage.png'}
                    ref={(img) => { this.img = img; }}
                    alt=""
                    onError={
                      () => { this.img.src = '../../static/images/noImage.png'; }
                    }
                  />
                </div>
              </div>
              <div
                style={[
                  CardStyles.tooltip,
                  this.state.hover && CardStyles.tooltip.hover,
                ]}
              >
                <h3>{this.props.title}</h3>
                <p>
                  {/* Tool tip content goes here! */}
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
