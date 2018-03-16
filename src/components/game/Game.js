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
 * @description - Helper method for rendering a link to a developer or article
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.url
 * @returns {React.Component}
 */
function link({ label, url, key }) {
  return (
    <Link key={key} to={url} style={{ textDecoration: 'none' }}>
      <Label>{label}</Label>
    </Link>
  );
}

link.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  key: PropTypes.any.isRequired,
};

/**
 * @description - Returns the main component to render a game's own
 * page
 * @param {Object} props
 * @returns {React.Component}
 */
class Game extends React.Component {
  static propTypes = {
    // this is derived state using selectors
    articles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })),
    cover: PropTypes.string,
    // this is derived state using selectors
    developers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    error: PropTypes.string,
    name: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    release: PropTypes.string,
    requested: PropTypes.bool,
    screenshots: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })),
    summary: PropTypes.string,

    fetchGame: PropTypes.func.isRequired,
  };

  static defaultProps = {
    articles: [],
    cover: null,
    developers: [],
    error: null,
    genres: [],
    name: '',
    // release defaults to today's date
    release: '',
    requested: false,
    screenshots: [],
    summary: null,
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchGame();
  }

  render() {
    const screenshots = this.props.screenshots ? this.props.screenshots : [];
    return (
      <div>
        <div style={[
            CommonAssets.stripeOverlay,
            CommonAssets.fillBackground,
          ]}
        />
        <InstanceDetails
          style={{
            container: GameStyles.container(this.props.cover),
            border: GameStyles.border,
            jumboTron: GameStyles.jumboTron,
          }}
        >
          <div>
            <h1 style={[GameStyles.name]}>{this.props.name}</h1>
            <div style={[GameStyles.secondaryInfo]}>
              <p>Released: {this.props.release} </p>
              {/* Genre should really be a array because that's what we get from the API */}
              <p>Genre:
                {
                  this.props.genres.map(genre => {
                    return (
                      <Label key={genre}>
                        {genre}
                      </Label>
                    );
                  })
                }
              </p>
            </div>

            <div style={[GameStyles.imageGallery]}>
              {
                screenshots.map(_screenshot => screenshot(_screenshot))
              }
            </div>
            <div style={[GameStyles.summary]}>
              <p>{this.props.summary}</p>
            </div>
            <div style={[GameStyles.developer]}>
              <p>Developer:
                {
                  this.props.developers.map(developer => link({
                    label: developer.name,
                    url: `/developers/${developer.id}`,
                    key: `developer-${developer.id}`,
                  }))
                }
              </p>
            </div>
            <div style={[GameStyles.articles]}>
              <h3>Articles:</h3>
              {
                this.props.articles.length > 0 &&
                <p>
                  {
                    this.props.articles.map(article => link({
                      label: article.title,
                      url: `/articles/${article.id}`,
                      key: `article-${article.id}`,
                    }))
                  }
                </p>
              }
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
}

export default Radium(Game);
