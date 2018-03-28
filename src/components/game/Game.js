/**
 * Game is a generic page template for Games.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Badge, Carousel, Jumbotron, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
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
      <a href={src} key={`${url}-a`} style={[ GameStyles.carouselScreenshotLink ]}>
        <img
          key={`${url}-image`}
          src={src}
          alt={alt}
          style={[ GameStyles.carouselScreenshotImage ]}
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
function link({ label, url, cover, key }) {
  return (
    <Link key={`${key}-link`} to={url} style={ GameStyles.minigridLink }>
      <div key={`${key}-minicard`} style={[ GameStyles.minicard(cover) ]}>
        <div style={[ GameStyles.minicardTextArea ]}>
          <p style={[ GameStyles.minicardParagraph ]}>
            {label}
          </p>
        </div>
      </div>
    </Link>
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
    price: 13.37,
    name: '',
    // release defaults to today's date
    release: '',
    requested: false,
    screenshots: [{url: '', alt: ''}],
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
    const price = this.props.price ? `\$${this.props.price / 100}` : null;
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
        <div style={[ GameStyles.blurBackgroundBefore ]}>
          <img src={coverURL} style={[ GameStyles.blurBackgroundImage ]}/>
        </div>
        <div style={[ GameStyles.backgroundBorder ]}>
          <Jumbotron style={ GameStyles.jumbotron }>

            <div style={{}}>
              <div style={[ GameStyles.titleText ]}>
                {this.props.name}
              </div>
            </div>
            <div>
              <div style={[ GameStyles.releaseDate ]}>
                Released {this.props.release}
              </div>
            </div>
            <div style={[ GameStyles.genreCluster ]}>
              <div style={[ GameStyles.genreIndicator ]}>
                Genres:&nbsp;
              </div>
              <div style={[ GameStyles.genreLabelGroup ]}>
                {
                  this.props.genres.map((genre) => {
                    return (
                      <span key={genre}>
                        <Label key={`${genre}-label`}>
                          {genre}
                        </Label>
                        &nbsp;
                      </span>
                    )
                  })
                }
              </div>
            </div>
            <Carousel style={ GameStyles.carousel }>
              <Carousel.Item>
                <a href={coverURL} style={[ GameStyles.carouselCoverLink ]}>
                  <img
                    src={coverURL}
                    alt={this.props.name}
                    style={[ GameStyles.carouselCoverImage ]}
                  />
                </a>
              </Carousel.Item>
                {
                  screenshots.map(_screenshot => screenshot(_screenshot))
                }
            </Carousel>
            <div style={[ GameStyles.secondaryDataCluster ]}>
              <div style={[ GameStyles.priceCluster ]}>
                <div style={[ GameStyles.priceIndicator ]}>
                  {price != null ? 'Price:' : ''}&nbsp;
                </div>
                <div style={[ GameStyles.priceTag ]}>
                  {price != null ? `${price}` : ''}
                </div>
              </div>
            </div>
            <hr style={[ GameStyles.horizontalRule ]} />
            <div>
              <div style={[ GameStyles.synoposisIndicator ]}>
                Synoposis:
              </div>
              <div style={[ GameStyles.synoposisHTMLContainer ]}>
                {ReactHTMLParser(this.props.summary)}
              </div>
            </div>
            <hr style={[ GameStyles.horizontalRule ]} />
            <div style={[ GameStyles.externalGridCluster ]}>
              <div style={[ GameStyles.developerGridCluster ]}>
                <div style={[ GameStyles.developerIndicator ]}>
                  Developers:
                </div>
                <div style={[ GameStyles.minigrid ]}>
                  {
                    this.props.developers.map(developer => link({
                      label: developer.name,
                      url: `/developers/${developer.id}`,
                      cover: developer.logo,
                      key: `developer-${developer.id}`,
                    }))
                  }
                </div>
              </div>
              <div style={[ GameStyles.articleGridCluster ]}>
                <div style={[ GameStyles.articleIndicator ]}>
                  Articles:
                </div>
                <div style={[ GameStyles.minigrid ]}>
                  {
                    this.props.articles.map(article => link({
                      label: article.title,
                      url: `/articles/${article.id}`,
                      cover: article.cover,
                      key: `article-${article.id}`,
                    }))
                  }
                </div>
              </div>
            </div>
            <div>
              <div style={[ GameStyles.twitterIndicator ]}>
                Twitter:
              </div>
              <p>Twitter is not available in your country.</p>
            </div>
            <div>
              <div style={[ GameStyles.youtubeIndicator ]}>
                YouTube:
              </div>
              <p>This video is not available in your country.</p>
            </div>
            <div>
              <div style={[ GameStyles.twitchIndicator ]}>
                Twitch:
              </div>
              <p>Twitch is not available in your country.</p>
            </div>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default Radium(Game);
