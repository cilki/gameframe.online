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
import Fields from '../fields/Fields';

/**
 * A single card instance within the InstanceGrid
 */
class Card extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.string,
    developer: PropTypes.string,
    origin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    author: PropTypes.string,
    year: PropTypes.number,

    price: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.shape({
      genre_id: PropTypes.number,
      name: PropTypes.string
    })),
    platforms: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      platform_id: PropTypes.number
    })),

    articles: PropTypes.number,
    developers: PropTypes.number,
    games: PropTypes.number,

    twitter: PropTypes.string,
    website: PropTypes.string,
    source: PropTypes.string
  };

  static defaultProps = {
    cover: '../../static/images/noImage.png',
    developer: null,
    origin: null,
    author: null,
    year: new Date().getFullYear(),

    price: null,
    genres: [],
    platforms: [],

    articles: null,
    developers: null,
    games: null,

    twitter: null,
    website: null,
    source: null
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
              <div style={[CardStyles.fields]} key={`${title}-fields`}>
                <img
                  style={[CardStyles.fieldsBackgroundImage]}
                  src={imageCover}
                  ref={(img) => { this.img = img; }}
                  alt=""
                  onError={
                    () => { this.img.src = '../../static/images/noImage.png'; }
                  }
                />

                <div>
                  <Fields
                    price={this.props.price}
                    genres={this.props.genres}
                    platforms={this.props.platforms}

                    games={this.props.games}
                    developers={this.props.developers}
                    articles={this.props.articles}

                    twitter={this.props.twitter}
                    website={this.props.website}
                    source={this.props.source}
                  />
                </div>
              </div>
              <div style={[CardStyles.captionContainer]} key={`${title}-caption`}>
                <div style={[CardStyles.caption]}>
                  <Label>
                    {country}
                  </Label>
                  <Label>
                    {this.props.developer}
                  </Label>
                  <Label>
                    {this.props.author}
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
