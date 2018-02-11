/**
 * Card is a representations of an instance of a model.
 */

import React from 'react';
import { Image, Badge, Label } from 'react-bootstrap';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.mouseEntry = this.mouseEntry.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.moreInfoTrigger = this.moreInfoTrigger.bind(this);
    this.state = {
      cover: null,
      title: null,
      company: null,
      year: null,
      hover: false,
      clicked: false
    };
  }

    mouseEntry() {
      this.setState({hover: true});
    }

    mouseLeave() {
      this.setState({hover: false});
    }

    moreInfoTrigger() {
      /* This is a placeholder for where the logic would probably go for moving
       * from the current card to its corresponding info page. Right now it
       * just prints an aleart message with the state information. */
      this.state.clicked ? this.setState({clicked: false}) :
                           this.setState({clicked: true});
      console.log('Placeholder for more information.' + '\nCover = ' +
            this.props.cover + '\nTitle = ' + this.props.title + '\nCompany = '
            + this.props.company + '\nYear = ' + this.props.year);
    }

  render() {
    /* Produce a 'card' containing a game's cover image and a caption
     * indicating the developer and publication year. */
    function renderCard (coverURL, developer, year, hover, clicked) {
      return(
        <div style={{
            overflow: 'hidden',
            borderRadius: '10px',
            backgroundColor: 'darkgray',
            transition: (hover ? 'transform 0.2s, filter 0.2s' : 'transform 0.2s, filter 0.1s'),
            transform: (hover ? 'scale(0.98)' : 'scale(1.0)'),
            filter: (clicked ? 'brightness(0.5) hue-rotate(360deg)' : 'none')
        }}>
          <div style={{
            overflow: 'hidden',
            borderRadius: '10px',
            transition: (hover ? 'transform 0.2s' : 'transform 0.2s'),
            transform: (hover ? 'scale(0.995)' : 'scale(1.0)'),
            backgroundColor: (hover ? 'gray' : 'darkgray'),
            margin: 'auto'
          }}>
            <img style={{
              maxWidth: "100%",
              borderRadius: '10px',
              transition: (hover ? 'transform 1.0s, filter 0.2s' : 'transform 0.2s, filter 0.2s'),
              transform: (hover ? 'scale(1.05)' : 'scale(1.0)'),
            }} src={coverURL} />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: "2% 5% 2% 0%"
          }}>
            <div style={{
              width: '65%',
              postion: 'relative',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              <Label>
                {developer}
              </Label>
            </div>
            <div style={{
              width: '15%',
            }}>
              <Badge>
                {year}
              </Badge>
            </div>
          </div>
        </div>
      );
    }


    return (
      <div onMouseEnter={this.mouseEntry} onMouseLeave={this.mouseLeave}
           onClick={this.moreInfoTrigger}
           style={{
             padding: '10px 10px 10px 10px',
             /* The below maxWidth property controls how small the card is
              * allowed to shrink. */
             maxWidth: '40%'
      }}>
        {renderCard(this.props.cover, this.props.company, this.props.year,
          this.state.hover, this.state.clicked)
        }
      </div>
    )
  }
}

export default Card;