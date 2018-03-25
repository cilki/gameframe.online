/**
 * Game is a generic page template for Games.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Carousel, Jumbotron, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactHTMLParser from 'react-html-parser';

import GameStyles from './GameStyles';
import InstanceDetails from '../InstanceDetails';

import CommonAssets from '../../inline-styles/CommonAssets';

/**
 * @description - Helper method for generating a component
 * to hold a screenshot
 * @param {Object} props
 * @param {String} props.url
 * @param {String} props.alt
 * @returns {React.Component}
 */
function screenshot({ url, alt }) {
  const src = url.indexOf('http') >= 0 ? url : `https://${url}`;
  return (
    <Carousel.Item key={`${url}-carousel-item`}>
      <a href={src} key={`${url}-a`}>
        <img
          key={`${url}-image`}
          src={src}
          alt={alt}
          style={[GameStyles.image]}
        />
      </a>
    </Carousel.Item>
  );
}

screenshot.propTypes = {
  url: PropTypes.string.isRequired,
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
    <ListGroupItem key={key}>
      <Link
        key={key}
        to={url}
        style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'row',
          maxWidth: '100%',
          textOverflow: 'ellipsis',
        }}
      >
        <Label
          style={{
            maxWidth: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          <div
            style={{
              maxWidth: '100%',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {label}
          </div>
        </Label>
      </Link>
    </ListGroupItem>
  );
}

link.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  key: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
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
    // we don't currently use this right now, but we may in the future
    error: PropTypes.string, //eslint-disable-line
    name: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    release: PropTypes.string,
    // we don't currently use this right now, but we may in the future
    requested: PropTypes.bool, //eslint-disable-line
    screenshots: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
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
    const coverURL = this.props.cover && this.props.cover.indexOf('http') < 0 ? `https://${this.props.cover}` : this.props.cover;
    return (
      <div
        style={[
          GameStyles.main,
        ]}
      >
        <div style={[
            CommonAssets.stripeOverlay,
            CommonAssets.fillBackground,
          ]}
        />
        <div style={{
          position: 'fixed',
          top: '0',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: '-150',
          }}
        >
          <img
            src={coverURL}
            style={{
            width: '10%',
            height: '10%',
            imageRendering: 'pixelated',
            filter: 'saturate(250%) blur(2px)',
            display: 'block',
            position: 'relative',
            margin: 'auto',
            transform: 'perspective(800px) translate3d(0, 0, 760px) scale(2)',
            zIndex: '-5',
            }}
          />
        </div>
        <div style={{ padding: '20px 2% 20px 2%'}}>
          <Jumbotron style={{
            padding: '2% 2% 2% 2%',
            margin: 'auto',
            maxWidth: '98%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '4px',
            opacity: '0.8'
          }}>

            <div style={{}}>
              <div style={{fontSize: 'calc(24px + 2.0vw)'}}>
                {this.props.name}
              </div>
            </div>
            <div>
              <div style={{fontSize: 'calc(16px + 0.75vw)'}}>
                Released {this.props.release}
              </div>
            </div>
            <div style={{display: 'flex'}}>
              <div style={{fontSize: 'calc(16px + 0.5vw)'}}>
                Genres:&nbsp;
              </div>
              <div style={{fontSize: 'calc(16px + 0.5vw)', display: 'flex', flexWrap: 'wrap'}}>
                {
                  this.props.genres.map((genre) => {
                    return (
                      <span>
                        <Label key={genre}>
                          {genre}
                        </Label>
                        &nbsp;
                      </span>
                    )
                  })
                }
              </div>
            </div>
            <div>
              <Carousel
                style={{
                  
                }}>
                {
                  screenshots.map(_screenshot => screenshot(_screenshot))
                }
                <Carousel.Item>
                </Carousel.Item>
              </Carousel>
            </div>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default Radium(Game);
