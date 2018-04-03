/**
 * Card is a representations of an instance of a model.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import iso from 'iso-3166-1';
import CardStyles from './CardStyles';
import Tooltip from '../tooltips/Tooltip';

/**
 * A single card instance within the InstanceGrid
 */
class Card extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.string,
    origin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    tooltipType: PropTypes.number,
    year: PropTypes.number,
    price: PropTypes.number,
    link1: PropTypes.string,
    link2: PropTypes.string,
    articles: PropTypes.arrayOf(PropTypes.number),
    developers: PropTypes.arrayOf(PropTypes.number),
    games: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    cover: '../../static/images/noImage.png',
    origin: null,
    year: new Date().getFullYear(),
    tooltipType: 0,
    price: -1,
    link1: '',
    link2: '',
    articles: [],
    developers: [],
    games: [],
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;
    const imageCover = this.props.cover !== null && this.props.cover.search('http') < 0 ?
      `https://${this.props.cover}` : this.props.cover;
    const origin = this.props.origin ? iso.whereNumeric(this.props.origin) : '';
    const country = origin ? origin.country : null;

    return (
      <div style={[CardStyles.main]}>
        <p style={[CardStyles.titleText]}>
          {this.props.title}
        </p>
        <Link to={this.props.url} style={{ textDecoration: 'none' }}>
          <div>
            <div style={[CardStyles.card]} key={title}>
              <div style={[CardStyles.imageContainerContainer]} key={`${title}-container`}>
                <div style={[CardStyles.imageContainer(imageCover)]} key={`${title}-image-container`}>
                  <div style={[CardStyles.backgroundImageContainer]}>
                    <img
                      style={[CardStyles.backgroundImage]}
                      src={imageCover}
                      alt=""
                      onError={
                        () => { this.img.src = '../../static/images/noImage.png'; }
                      }
                    />
                  </div>
                  <img
                    style={[CardStyles.image]}
                    key={`${title}-image`}
                    src={imageCover}
                    ref={(img) => { this.img = img; }}
                    alt=""
                    onError={
                      () => { this.img.src = '../../static/images/noImage.png'; }
                    }
                  />
                </div>
              </div>
              <div style={[CardStyles.tooltip]} key={`${title}-tooltip`}>
                <img
                  style={[CardStyles.tooltipBackgroundImage]}
                  src={imageCover}
                  ref={(img) => { this.img = img; }}
                  alt=""
                  onError={
                    () => { this.img.src = '../../static/images/noImage.png'; }
                  }
                />

                <div>
                  <Tooltip
                    price={this.props.price}
                    
                    games={this.props.games.length}
                    developers={this.props.developers.length}
                    articles={this.props.articles.length}
                    
                    twitter={this.props.link1}
                    website={this.props.link2}
                    source={this.props.link1}
                  />
                </div>
              </div>
              <div style={[CardStyles.captionContainer]} key={`${title}-caption`}>
                <div style={[CardStyles.caption]}>
                  <Label>
                    {country}
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
