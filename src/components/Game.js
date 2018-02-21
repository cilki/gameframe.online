/**
 * Game is a generic page template for Games.
 */

import React from 'react';
import Radium from 'radium';
import { Jumbotron, Label, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Game as GameStyles } from '../inline-styles/GameStyles';
import InstanceDetails from './InstanceDetails';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null, /* Text */
      image1URL: null, /* http:// */
      image2URL: null, /* http:// */
      image3URL: null, /* http:// */
      release: null, /* Text: */
      genre: null, /* Text */
      synoposis: null, /* Text */
      developer: null, /* Text */
      articleURL: null, /* http:// */
      article: null, /* Text */
      twitter: null, /* Text */
      youtubeURL: null, /* http:// */
      youtube: null, /* Text */
      twitchURL: null, /* http:// */
      twitch: null, /* Text */
      hover1: false,
      hover2: false,
      hover3: false,
    };
  }

  render() {
    let index = 0;

    return (
      <InstanceDetails
        style={{
        container: GameStyles.container(this.props.coverURL),
        border: GameStyles.border,
        jumboTron: GameStyles.jumboTron,
      }}
        twitterWidget={{ ...this.props.twitter }}
      >
        <div>
          <h1 style={[GameStyles.name]}>{this.props.game}</h1>
          <div style={[GameStyles.secondaryInfo]}>
            <p>Released: {this.props.release} </p>
            <p>Genre: <Label>{this.props.genre}</Label></p>
          </div>

          <div style={[GameStyles.imageGallery]}>
            <div
              key={index++}
              style={[
              GameStyles.imageContainer,
            ]}
            >
              <div>
                <a href={this.props.image1URL}>
                  <img key={index++} style={[GameStyles.image]} src={this.props.image1URL} />
                </a>
              </div>
            </div>
            <div key={index++} style={[GameStyles.imageContainer]}>
              <div>
                <a href={this.props.image2URL}>
                  <img
                    style={[
                    GameStyles.image,
                  ]}
                    src={this.props.image2URL}
                  />
                </a>
              </div>
            </div>
            <div
              key={index++}
              style={[
              GameStyles.imageContainer,
            ]}
            >
              <div>
                <a href={this.props.image3URL}>
                  <img
                    key={index++}
                    style={[
                    GameStyles.image,
                  ]}
                    src={this.props.image3URL}
                  />
                </a>
              </div>
            </div>
          </div>
          <div style={[GameStyles.synoposis]}>
            <p>{this.props.synoposis}</p>
          </div>
          <div style={[GameStyles.developer]}>
            <p>Developer: <Link to={this.props.developerURL} style={{ textDecoration: 'none' }}><Label>{this.props.developer}</Label></Link></p>
          </div>
          <div style={[GameStyles.articles]}>
            <h3>Articles:</h3> <p><Link to={this.props.articleURL} style={{ textDecoration: 'none' }}><Label>{this.props.article}</Label></Link></p>
          </div>
          <div style={[GameStyles.youtube]}>
            <h3>YouTube:</h3>
          </div>
          <div style={[GameStyles.twitch]}>
            <h3>Twitch:</h3>
          </div>
        </div>
      </InstanceDetails>
    );
  }
}

export default Radium(Game);
