/**
 * Tooltip represents a snapshot of data for an
 * instance of a Card.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
/* import TooltipStyles from './TooltipStyles'; */

class Tooltip extends React.Component {
  static propTypes = {
    price: PropTypes.number,
    
    games: PropTypes.number,
    developers: PropTypes.number,
    articles: PropTypes.number,
    
    twitter: PropTypes.string,
    website: PropTypes.string,
    source: PropTypes.string,
  };

  static defaultProps = {
    price: -1,
    
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
    var references = 0;
    var medias = 0;
    
    function showPrice(price) {
      if (price == 0) {
        return (
          <p>
            Price: 
              <Badge>
                free
              </Badge>
          </p>
        );
      } else if (price > 0) {
        price = price / 100;
        return (
          <p>
            Price: 
              <Badge>
                ${price}
              </Badge>
          </p>
        );
      } else {
        return (null);
      }
    }
    
    function showPlatforms() {
      return (
        <div>
          <h4>
            Platforms
          </h4>
        </div>
      );      
    }
    
    function showReference(name, number) {
      if (number > 0) {
        references += 1;
        return (
          <p>
            {name}:
              <Badge>
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
          <p>{name}: <Label>{url}</Label></p>
        );
      } else {
        return (null);
      }
    }
    
    function showNone(number) {
      if (number <= 0) {
        return (
          <p>
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
        {/*showPlatforms*/}
        
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