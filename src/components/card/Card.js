/**
 * Card is a representations of an instance of a model.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardStyles from './CardStyles';
import GameTooltip from '../tooltips/GameTooltip';
import DeveloperTooltip from '../tooltips/DeveloperTooltip';
import ArticleTooltip from '../tooltips/ArticleTooltip';

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
    cover: null,
    origin: null,
    year: new Date().getFullYear(),
    tooltipType: 0,
    price: 0,
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

    this.state = {
      hover: false,
    };

    this.iso = require('iso-3166-1');
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
    const tooltipType = this.props.tooltipType;

    /**
     * @description - Render the tooltip associated with the type.
     * @returns {React.Component}
     */
    function tooltip(games, price,
                     developers,
                     articles,
                     link1, link2) {
      if (tooltipType === 1) {
        return (
          <GameTooltip
            price={price}
            articles={articles.length}
          />
        );
      } else if (tooltipType === 2) {
        return (
          <DeveloperTooltip
            games={games.length}
            articles={articles.length}
            twitter={link1}
            website={link2}
          />
        );
      } else if (tooltipType === 3) {
        return (
          <ArticleTooltip
            games={games}
            developers={developers}
            article_link={link1}
          />
        );
      }
      return <div>Error: No tooltipType defined!</div>;
    }

    const origin = this.props.origin ? this.iso.whereNumeric(this.props.origin) : '';
    const country = origin ? origin.country : null;

    return (
      <div
        style={[CardStyles.main]}
        onMouseEnter={() => this.onMouseEntry}
        onMouseLeave={() => this.onMouseLeave}
      >
        <div style={{
          color: '#e9e9e9',
          maxWidth: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {this.props.title}
        </div>

        <Link to={this.props.url} style={{ textDecoration: 'none' }}>
          <div>
            <div style={[CardStyles.card]} key={title}>
              <div style={[CardStyles.imageContainerContainer]} key={`${title}-container`}>
                <div style={[CardStyles.imageContainer(imageCover || '../../static/images/noImage.png')]} key={`${title}-image-container`}>
                  <div style={[CardStyles.backgroundImageContainer]}>
                    <img
                      style={[CardStyles.backgroundImage]}
                      src={imageCover || '../../static/images/noImage.png'}
                      alt=""
                      onError={
                        () => { this.img.src = '../../static/images/noImage.png'; }
                      }
                    />
                  </div>
                  <img
                    style={[CardStyles.image]}
                    key={`${title}-image`}
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
                ]}
                key={`${title}-tooltip`}
              >
                <img
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '-2',
                    filter: 'blur(20px) saturate(1.15)',
                    transform: 'scale(5.20)',
                  }}
                  src={imageCover || '../../static/images/noImage.png'}
                  ref={(img) => { this.img = img; }}
                  alt=""
                  onError={
                    () => { this.img.src = '../../static/images/noImage.png'; }
                  }
                />
                <div>
                  {tooltip(this.props.games, this.props.price,
                           this.props.developers,
                           this.props.articles,
                           this.props.link1, this.props.link2)}
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
