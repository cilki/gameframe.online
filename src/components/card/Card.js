/**
 * Card is a representations of an instance of a model.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import postcssJs from 'postcss-js';
import autoprefixer from 'autoprefixer';
import iso from 'iso-3166-1';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardStyles from './CardStyles';

/**
 * @description - Obtain the country from an iso-3166-1 standard.
 * @param {String} country
 * @return {String}
 */
function showCountry(country) {
  let countryName = null;
  if (country != null) {
    const countryNumber = `${country}`;
    const countryIso = iso.whereNumeric(countryNumber);
    countryName = countryIso ? countryIso.country : 'Country Unknown';
  }
  return countryName;
}

/**
 * A single card instance within the Grid.
 */
class Card extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.string,
    developer: PropTypes.string,
    country: PropTypes.string,
    author: PropTypes.string,
    year: PropTypes.number,
    aspectRatio: PropTypes.number,
    fields: PropTypes.node,
  };

  static defaultProps = {
    cover: '../../static/images/noImage.png',
    developer: null,
    country: null,
    author: null,
    year: new Date().getFullYear(),
    aspectRatio: 1.0,
    fields: null,
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = { hovered: false };
  }

  hoverHandlerOn() {
    this.setState({ hovered: false });
    console.log(this.state.hovered); //eslint-disable-line
  }

  hoverHandlerOff() {
    this.setState({ hovered: true });
    console.log(this.state.hovered); //eslint-disable-line
  }

  render() {
    const { title } = this.props;
    const imageCover = this.props.cover !== null && this.props.cover.search('http') < 0 ?
      `https://${this.props.cover}` : this.props.cover;
    const trueImageCover = imageCover || '../../static/images/noImage.png';
    const prefixer = postcssJs.sync([autoprefixer]);

    return (
      <div
        style={[prefixer(CardStyles.main(this.props.aspectRatio))]}
        key={`${title}-cardMain`}
      >
        <p style={[prefixer(CardStyles.titleText)]}>
          {this.props.title}
        </p>
        <Link to={this.props.url} style={{ textDecoration: 'none' }}>
          <div>
            <div style={[CardStyles.card]} key={title}>
              <div style={[prefixer(CardStyles.imageContainerContainer(this.props.aspectRatio))]} key={`${title}-container`}>
                <div style={[prefixer(CardStyles.imageContainer(trueImageCover))]} key={`${title}-image-container`}>
                  <div style={[prefixer(CardStyles.backgroundImageContainer)]}>
                    <img
                      style={[prefixer(CardStyles.backgroundImage)]}
                      src={trueImageCover}
                      key={`${title}-backgroundImageReal`}
                      alt=""
                      onError={
                        () => { this.img.src = '../../static/images/noImage.png'; }
                      }
                    />
                  </div>
                  <img
                    style={[prefixer(CardStyles.image)]}
                    key={`${title}-image`}
                    src={trueImageCover}
                    alt=""
                    ref={(img) => { this.img = img; }}
                    onError={
                      () => { this.img.src = '../../static/images/noImage.png'; }
                    }
                  />
                </div>
              </div>
              <div style={[prefixer(CardStyles.fields)]} key={`${title}-fields`}>
                {this.props.fields}
                <div style={{ height: '0' }}>
                  <img
                    style={[prefixer(CardStyles.fieldsBackgroundImage)]}
                    src={trueImageCover}
                    ref={(img) => { this.img = img; }}
                    alt=""
                    onError={
                      () => { this.img.src = '../../static/images/noImage.png'; }
                    }
                  />
                </div>
              </div>
              <div style={[prefixer(CardStyles.captionContainer)]} key={`${title}-caption`}>
                <div style={[prefixer(CardStyles.caption)]}>
                  <Label>
                    {showCountry(this.props.country)}
                  </Label>
                  <Label>
                    {this.props.developer}
                  </Label>
                  <Label>
                    {this.props.author}
                  </Label>
                </div>
                <div style={[prefixer(CardStyles.badgeContainer)]}>
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
