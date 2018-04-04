/**
 * Tooltip represents a snapshot of data for an
 * instance of a Card.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import Styles from './TooltipStyles';

class Tooltip extends React.Component {
  static propTypes = {
    price: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      genre_id: PropTypes.number,
    })),
    platforms: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      platform_id: PropTypes.number,
    })),
    
    games: PropTypes.number,
    developers: PropTypes.number,
    articles: PropTypes.number,
    
    twitter: PropTypes.string,
    website: PropTypes.string,
    source: PropTypes.string,
  };

  static defaultProps = {
    price: -1,
    genres: [],
    platforms: [],
    
    games: 0,
    developers: 0,
    articles: 0,
    
    twitter: null,
    website: null,
    source: null,
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const indent = Styles.indent;
    var references = 0;
    var medias = 0;
    
    function showPrice(price) {
      if (price == 0) {
        return (
          <p>
            Price: 
              <Badge style={indent}>
                free
              </Badge>
          </p>
        );
      } else if (price > 0) {
        price = price / 100;
        return (
          <p>
            Price: 
              <Badge style={indent}>
                ${price}
              </Badge>
          </p>
        );
      } else {
        return (null);
      }
    }
    
    function showGenres(genres) {
      if (genres.length > 0) {
        return (
          <div>
            <h4>
              Genres
            </h4>
            {
            genres.map((genre) => {
              return (
                <span key={genre.name}>
                  <Label key={`${genre.name}-tooltip-label`}>
                    {genre.name}
                  </Label>
                  &nbsp;
                </span>
              );
            })
            }
          </div>
        );
      } else {
        return (null);
      }        
    }
    
    function showPlatforms(platforms) {
      if (platforms.length > 0) {
        return (
          <div>
            <h4>
              Platforms
            </h4>
            {
            platforms.map((platform) => {
              return (
                <span key={platform.name}>
                  <Label key={`${platform.name}-tooltip-label`}>
                    {platform.name}
                  </Label>
                  &nbsp;
                </span>
              );
            })
            }
          </div>
        );
      } else {
        return (null);
      }        
    }
    
    function showReference(name, number) {
      if (number > 0) {
        references += 1;
        return (
          <p style={indent}>
            {name}: 
              <Badge style={indent}>
                {number}
              </Badge>
          </p>
        );
      } else {
        return (null);
      }
    }
    
    function showMedia(name, url) {
      if (url) {
        medias += 1;
        return (
          <div style={[Styles.label]}>
            {url}
          </div>
        );
      } else {
        return (null);
      }
    }
    
    function showNone(number) {
      if (number <= 0) {
        return (
          <p style={indent}>
            None.
          </p>
        );
      } else {
        return (null);
      }
    }
  
    return (
      <div>
        {showPrice(this.props.price)}
        {showGenres(this.props.genres)}
        {showPlatforms(this.props.platforms)}
        
        <div>
          <h4>
            References
          </h4>
          {showReference("Games", this.props.games)}
          {showReference("Developers", this.props.developers)}
          {showReference("Articles", this.props.articles)}
          {showNone(references)}
        </div>
        
        <div>
          <h4>
            Media
          </h4>
          {showMedia("Twitter", this.props.twitter)}
          {showMedia("Website", this.props.website)}
          {showMedia("Source", this.props.source)}
          {showNone(medias)}
        </div>
      </div>
    );
  }
}

export default Radium(Tooltip);