/**
 * Game is a generic page template for Games.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import GameStyles from './GameStyles';
import InstanceDetails from '../InstanceDetails';

import CommonAssets from '../../inline-styles/CommonAssets';

/**
 * @description - Helper method for generating a component
 * to hold a screenshot
 * @param {Object} props
 * @param {String} props.src
 * @param {String} props.alt
 * @returns {React.Component}
 */
function screenshot({ src, alt }) {
  return (
    <div
      key={`${src}-div-image`}
      style={[GameStyles.imageContainer]}
    >
      <div>
        <a href={src}>
          <img
            key={`${src}-image`}
            src={src}
            alt={alt}
            style={[GameStyles.image]}
          />
        </a>
      </div>
    </div>
  );
}

screenshot.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

screenshot.defaultProps = {
  alt: '',
};

/**
 * @description - Returns the main component to render a game's own
 * page
 * @param {Object} props
 * @returns {React.Component}
 */
function Game(props) {
  return (
    <div>
      <div style={[
          CommonAssets.stripeOverlay,
          CommonAssets.fillBackground,
        ]}
      />
      <InstanceDetails
        style={{
          container: GameStyles.container(props.coverURL),
          border: GameStyles.border,
          jumboTron: GameStyles.jumboTron,
        }}
        twitterWidget={{ ...props.twitter }}
      >
        <div>
          <h1 style={[GameStyles.name]}>{props.game}</h1>
          <div style={[GameStyles.secondaryInfo]}>
            <p>Released: {props.release} </p>
            {/* Genre should really be a array because that's what we get from the API */}
            <p>Genre: <Label>{props.genre}</Label></p>
          </div>

          <div style={[GameStyles.imageGallery]}>
            {
              props.screenshots.map(_screenshot => screenshot(_screenshot))
            }
          </div>
          <div style={[GameStyles.synoposis]}>
            <p>{props.synoposis}</p>
          </div>
          <div style={[GameStyles.developer]}>
            <p>Developer: <Link to={props.developerURL} style={{ textDecoration: 'none' }}><Label>{props.developer}</Label></Link></p>
          </div>
          <div style={[GameStyles.articles]}>
            <h3>Articles:</h3> <p><Link to={props.articleURL} style={{ textDecoration: 'none' }}><Label>{props.article}</Label></Link></p>
          </div>
          <div style={[GameStyles.youtube]}>
            <h3>YouTube:</h3>
          </div>
          <div style={[GameStyles.twitch]}>
            <h3>Twitch:</h3>
          </div>
        </div>
      </InstanceDetails>
    </div>
  );
}

Game.propTypes = {
  article: PropTypes.string.isRequired,
  articleURL: PropTypes.string.isRequired,
  coverURL: PropTypes.string,
  developer: PropTypes.string.isRequired,
  developerURL: PropTypes.string.isRequired,

  game: PropTypes.string.isRequired,
  genre: PropTypes.arrayOf(PropTypes.string),
  release: PropTypes.string,
  screenshots: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  })),
  synoposis: PropTypes.string,
  twitter: PropTypes.object, //eslint-disable-line
};

Game.defaultProps = {
  coverURL: null,
  genre: [],
  // release defaults to today's date
  release: new Date().toString(),
  screenshots: [],
  synoposis: null,
};

export default Radium(Game);
