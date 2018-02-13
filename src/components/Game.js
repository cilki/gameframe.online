/**
 * Game is a generic page template for Games.
 */

import React from 'react';
import Radium from 'radium';
import {Jumbotron, Label, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Game as GameStyles } from '../inline-styles/GameStyles';

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
      twitch: null,        /* Text */
      hover1: false,
      hover2: false,
      hover3: false,
      hover4: false
    };
  }

  componentWillMount() {
    this.mouseEntry1 = this.mouseEntry1.bind(this);
    this.mouseLeave1 = this.mouseLeave1.bind(this);
    this.mouseEntry2 = this.mouseEntry2.bind(this);
    this.mouseLeave2 = this.mouseLeave2.bind(this);
    this.mouseEntry3 = this.mouseEntry3.bind(this);
    this.mouseLeave3 = this.mouseLeave3.bind(this);
  }

  mouseEntry1(e) {
    this.setState({hover1: true});
  }

  mouseLeave1(e) {
    this.setState({hover1: false});
  }

  mouseEntry2(e) {
    this.setState({hover2: true});
  }

  mouseLeave2(e) {
    this.setState({hover2: false});
  }

  mouseEntry3(e) {
    this.setState({hover3: true});
  }

  mouseLeave3(e) {
    this.setState({hover3: false});
  }

  mouseEntry4(e) {
    this.setState({hover4: true});
  }

  mouseLeave4(e) {
    this.setState({hover4: false});
  }

  render() {
    return (
      <div style ={[GameStyles.border]}>
        <Jumbotron style={[GameStyles.jumboTron], {borderRadius: '10px'}}>
          <h1 style={[GameStyles.name]}>{this.props.game}</h1>
          <div style={[GameStyles.secondaryInfo]}>
            <p>Released: {this.props.release} </p>
            <p>Genre: <Label>{this.props.genre}</Label></p>
          </div>

          <div style={[GameStyles.imageGallery]}>
            <div style={[
              GameStyles.imageContainer,
              this.state.hover1 && GameStyles.imageContainerHover
            ]}>
              <div onMouseEnter={this.mouseEntry1} onMouseLeave={this.mouseLeave1}>
                <a href={this.props.image1URL}>
                  <img style={[
                    GameStyles.image,
                    this.state.hover1 && GameStyles.imageHover
                  ]} src={this.props.image1URL} />
                </a>
              </div>
            </div>
            <div style={[
              GameStyles.imageContainer,
              this.state.hover2 && GameStyles.imageContainerHover
            ]}>
              <div onMouseEnter={this.mouseEntry2} onMouseLeave={this.mouseLeave2}>
                <a href={this.props.image2URL}>
                  <img style={[
                    GameStyles.image,
                    this.state.hover2 && GameStyles.imageHover
                  ]} src={this.props.image2URL} />
                </a>
              </div>
            </div>
            <div style={[
              GameStyles.imageContainer,
              this.state.hover3 && GameStyles.imageContainerHover
            ]}>
              <div onMouseEnter={this.mouseEntry3} onMouseLeave={this.mouseLeave3}>
                <a href={this.props.image3URL}>
                  <img style={[
                    GameStyles.image,
                    this.state.hover3 && GameStyles.imageHover
                  ]} src={this.props.image3URL} />
                </a>
              </div>
            </div>
          </div>
          <div style={[GameStyles.synoposis]}>
            <p>{this.props.synoposis}</p>
          </div>
          <div style={[GameStyles.developer]}>
            <p>Developer: <Link to={this.props.developerURL} style={{textDecoration: 'none'}}><Label>{this.props.developer}</Label></Link></p>
          </div>
          <div style={[GameStyles.articles]}>
            <h3>Articles:</h3>
          </div>
          <div style={[GameStyles.twitter]}>
            <h3>Twitter:</h3>
          </div>
          <div style={[GameStyles.youtube]}>
            <h3>YouTube:</h3>
          </div>
          <div style={[GameStyles.twitch]}>
            <h3>Twitch:</h3>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default Radium(Game);
