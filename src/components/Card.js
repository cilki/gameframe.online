/**
 * Card is a representations of an instance of a model.
 */

import React from 'react';
import Radium from 'radium';
import { Badge, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Card as CardStyles } from '../inline-styles/CardStyles';

/* @description - Produces a 'card' containing a game's cover image and a
 * caption indicating the developer and publication year.
 * @param {String} coverURL - url to go to when clicked
 * @param {String} developer - the developer of the associated game
 * @param {String} year - the year the game was made in a string
 * @param {Bool} hover - whether the user is hovering over this component
 * @param {Bool} clicked - whether this component is in a 'clicked' state
 * @returns {React.Component}
 */
function renderCard (coverURL, developer, year, hover) {
  return(
    <div style={[
      CardStyles.card,
      hover && CardStyles.card.hover,
    ]}>
      <div style={[
        CardStyles.imageContainer,
        hover && CardStyles.imageContainer.hover
      ]}>
        <img style={[
          CardStyles.image,
          hover && CardStyles.image.hover
        ]} src={coverURL} />
      </div>
      <div style={[CardStyles.captionContainer]}>
        <div style={[CardStyles.caption]}>
          <Label>
            {developer}
          </Label>
        </div>
        <div style={[CardStyles.badgeContainer]}>
          <Badge>
            {year}
          </Badge>
        </div>
      </div>
    </div>
  );
}

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
      cover: null,
      title: null,
      company: null,
      year: null,
      hover: false
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
    this.setState({hover: true});
  }

  /**
   * @description - Event handler for the `mouseLeave` event
   */
  mouseLeave(e) {
    this.setState({hover: false});
  }

  render() {

    return (
      <div style={[CardStyles.main]}>
        <Link to={this.props.url} style={{textDecoration: 'none'}}>
          <div
            onMouseEnter={this.mouseEntry}
            onMouseLeave={this.mouseLeave}
          >
            {renderCard(this.props.cover, this.props.company, this.props.year,
              this.state.hover, this.state.clicked)
            }
          </div>
        </Link>
      </div>
    )
  }
}

export default Radium(Card);
