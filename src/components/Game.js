/**
 * Game is a generic page template for Games.
 */

import React from 'react';

import {Jumbotron, Label, Image, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,         /* Text */
      image1URL: null,    /* http:// */
      image2URL: null,    /* http:// */
      image3URL: null,    /* http:// */
      release: null,      /* Text: */
      genre: null,        /* Text */
      synoposis: null,    /* Text */
      developer: null,    /* Text */
      articleURL: null,   /* http:// */
      article: null,      /* Text */
      twitterURL: null,   /* http:// */
      twitter: null,      /* Text */
      youtubeURL: null,   /* http:// */
      youtube: null,      /* Text */
      twitchURL: null,    /* http:// */
      twitch: null        /* Text */
    };
  }

  render() {
    return (
      <div style ={{padding: '0px 20px 20px 20px'}}>
        <Jumbotron style={{
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h1 style={{paddingLeft: '5%'}}>{this.props.game}</h1>
          <div style={{
            display: 'flex', justifyContent: 'space-around'
          }}>
            <p>Released: {this.props.release} </p>
            <p>Genre: <Label>{this.props.genre}</Label></p>
          </div>

          <div style={{
            display:'flex',
            maxWidth: '100%',
            height: '100%',
            overflow: 'hidden',
          }}>
            <div style={{
              maxWidth: '33.333333%',
              overflow: 'hidden'
            }}>
              <img style={{maxWidth: '100%', maxHeight: '100%', transform: 'scale(1.2)' }} src={this.props.image1URL} />
            </div>
            <div style={{
              maxWidth: '33.333333%',
              overflow: 'hidden'
            }}>
              <img style={{maxWidth: '100%', maxHeight: '100%', transform: 'scale(1.2)' }} src={this.props.image2URL} />
            </div>
            <div style={{
              maxWidth: '33.333333%',
              overflow: 'hidden'
            }}>
              <img style={{maxWidth: '100%', maxHeight: '100%', transform: 'scale(2.0)' }} src={this.props.image3URL} />
            </div>
          </div>
          <div style={{
            padding: '20px 2% 20px 2%'
          }}>
            <p>{this.props.synoposis}</p>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around'
          }}>
            <p>Developer: <Link to={this.props.developerURL} style={{textDecoration: 'none'}}><Label style={{}}>{this.props.developer}</Label> </Link></p>
          </div>
          <div style={{
            paddingLeft: '2%'
          }}>
            <h3>Articles:</h3>
          </div>
          <div style={{
            paddingLeft: '2%'
          }}>
            <h3>Twitter:</h3>
          </div>
          <div style={{
            paddingLeft: '2%'
          }}>
            <h3>YouTube:</h3>
          </div>
          <div style={{
            paddingLeft: '2%'
          }}>
            <h3>Twitch:</h3>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default Game;
