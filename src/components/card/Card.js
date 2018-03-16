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
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.string,
    origin: PropTypes.string,
    tooltipType: PropTypes.number,
    year: PropTypes.number,
  };

  static defaultProps = {
    cover: null,
    origin: null,
    year: new Date().getFullYear(),
    tooltipType: 0,
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
    const developer = this.props.develper !== null ? this.props.developer :
      `Unknown Developer`; 
    const tooltipType = this.props.tooltipType;
	
	/**
	 * @description - Render the tooltip associated with the type.
	 * @returns {React.Component}
	 */
	function tooltip() {
	  if (tooltipType == 1) {
	    return gameTooltip();
	  } else if (tooltipType == 2) {
	    return developerTooltip();
	  } else if (tooltipType == 3) {
	    return articleTooltip();
	  } else {
        return <div>Error: No tooltipType defined!</div>;
      }	
	}
	  
    /**
	 * @description - Render the game tooltip.
	 * @returns {React.Component}
	 */
	function gameTooltip() {
      return (
        <div>
	      <div>Price: $00.00</div>
		  <div>Genres: <Badge>Genre</Badge></div>
		  <div>Platforms</div>
		  <div>Windows: Yes</div>
		  <div>Mac: No</div>
		  <div>Linux: No</div>
		  <div>Media</div>
		  <div>Streams: #0</div>
		  <div>Videos: #0</div>
		  <div>Tweets: #0</div>
		  <div>Articles: #0</div>
		</div>
	  );
    }

    /**
	 * @description - Render the developer tooltip.
	 * @returns {React.Component}
	 */	
    function developerTooltip() {
      return (
	    <div>
	      <div>Games: #0</div>
		  <div>Articles: #0</div>
		  <div>Media</div>
		  <div>Twitter: Link</div>
		  <div>Website: Link</div>
		</div>
	 );
    }

    /**
	 * @description - Render the developer tooltip.
	 * @returns {React.Component}
	 */	
    function articleTooltip() {
      return (
	    <div>
	      <div>Games: <Badge>Game</Badge></div>
		  <div>Developers: <Badge>Developer</Badge></div>
		  <div>Media</div>
		  <div>Source: Link</div>
		</div>
	  );
    }  

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
                    style={[CardStyles.image]} key={`${title}-image`}
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
                ]} key={`${title}-tooltip`}
              >
                 
                  <img
                    style={{maxWidth: '100%', maxHeight: '100%', position: 'fixed', top: '0', left: '0', zIndex: '-2', filter: 'blur(20px) saturate(2.0)', transform: 'scale(5.20)'}}
                    src={imageCover || '../../static/images/noImage.png'}
                    ref={(img) => { this.img = img; }}
                    alt=""
                    onError={
                      () => { this.img.src = '../../static/images/noImage.png'; }
                    }
                  />
				<div>
				  <h3>{this.props.title}</h3>
			      {tooltip()}						  
				</div>
              </div>
              <div style={[CardStyles.captionContainer]} key={`${title}-caption`}>
                <div style={[CardStyles.caption]}>
                  <Label>
                    {this.props.origin}
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
