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
    var references = 0;
    var medias = 0;
    
    /**
     * @description - Conditionally render the price of a game.
     * A USD price will only show up if a number > 0 is supplied.
     * If number is supplied 0, then the game is considered free.
     * Otherwise, no price will appear.
     * @param {number} price
     * @return {React.component|null}
     */
    function showPrice(price) {
      if (price == 0) {
        return (
          <p>
            Price:
            &nbsp;
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
            &nbsp;
              <Badge>
                ${price}
              </Badge>
          </p>
        );
      } else {
        return (null);
      }
    }
    
    /**
     * @description - Conditionally render up to a maximum number 
     * (maxLimit) of items from a named field.
     * @param {name} string
     * @param {maxLimit} number
     * @param {items} array
     * @return {React.component|null}
     */
    function showItems(name, maxLimit, items) {
      if (items.length > 0) {
        return (
          <div>
            <h4>
              {name}
            </h4>
            {getItems(maxLimit, items)}
          </div>
        );
      } else {
        return (null);
      }
    }
    
    /**
     * @description - Helper method to showItems().
     * @param {maxLimit} number
     * @param {items} array
     * @return {array}
     */
    function getItems(maxLimit, items) {
      var subItems = [];
      var limit = items.length;
      
      if (limit > maxLimit) {
        limit = maxLimit;
      }
      
      for(let i = 0; i < limit; i++) {
        subItems.push(
          <div key={`item-${i}`} style={[Styles.label]}>
            {items[i].name}  
          </div>
        );
      }
      return subItems;      
    }
    
    /**
     * @description - Conditionally render a 
     * named reference's number amount.
     * @param {name} string
     * @param {number} number
     * @return {React.component|null}
     */
    function showReference(name, number) {
      if (number > 0) {
        references += 1;
        return (
          <p>
            &nbsp;
            {name}:
            &nbsp;
              <Badge>
                {number}
              </Badge>
          </p>
        );
      } else {
        return (null);
      }
    }
    
    /**
     * @description - Conditionally render a 
     * named media's url.
     * @param {name} string
     * @param {url} string
     * @return {React.component|null}
     */
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
    
    /**
     * @description - Conditionally render the word "None." 
     * for when there are no references or medias.
     * @param {number} number
     * @return {React.component|null}
     */
    function showNone(number) {
      if (number <= 0) {
        return (
          <p>
            &nbsp;
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
        {showItems("Genres", 3, this.props.genres)}
        {showItems("Platforms", 3, this.props.platforms)}
        
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