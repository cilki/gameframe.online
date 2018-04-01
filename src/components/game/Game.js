/**
 * Game is a generic page template for Games.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium, {StyleRoot} from 'radium';
import { Badge, Carousel, Jumbotron, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactHTMLParser from 'react-html-parser';
import { Timeline } from 'react-twitter-widgets';
import InstanceDetails from '../instance-details/InstanceDetails';
import InstanceDetailsStyles from '../instance-details/InstanceDetailsStyles';
import Minigrid from '../minigrid/Minigrid';
import Minicard from '../minicard/Minicard';
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
      <a href={src} key={`${url}-a`} style={[ InstanceDetailsStyles.carouselScreenshotLink ]}>
        <img
          key={`${url}-image`}
          src={src}
          alt={alt}
          style={[ InstanceDetailsStyles.carouselScreenshotImage ]}
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
    <Minicard label={label} url={url} cover={cover} cardKey={`${key}-inner`} key={key}/>
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

    //this.steamApi = require('steam-api');
    //this.userStats = new this.steamApi.UserStats('B742258BCF24425642B7E0C770450FC2');
  }

  componentDidMount() {
    this.props.fetchGame();
  }

  render() {
    const screenshots = this.props.screenshots ? this.props.screenshots : [];
    const coverURL = this.props.cover && this.props.cover.indexOf('http') < 0 ? `https://${this.props.cover}` : this.props.cover;
    const price = this.props.price ? `\$${this.props.price / 100}` : null;
    const platforms = this.props.platforms ? this.props.platforms : [];
    //this.userStats.GetNumberOfCurrentPlayers('3600').done(function(result){
    //  console.log(result);
    //});
    const steamApiKey = 'B742258BCF24425642B7E0C770450FC2';
    return (
      <StyleRoot>
      <InstanceDetails imageURL={coverURL}>
        <div style={[ InstanceDetailsStyles.gamePrimaryDataCluster]}>
          <div style={{}}>
            <div style={[ InstanceDetailsStyles.titleText ]}>
              {this.props.name}
            </div>
          </div>
          <div>
            <div style={[ InstanceDetailsStyles.releaseDate ]}>
              Released {this.props.release}
            </div>
          </div>
          <div style={[ InstanceDetailsStyles.genreCluster ]}>
            <div style={[ InstanceDetailsStyles.genreIndicator ]}>
              Genres:&nbsp;
            </div>
            <div style={[ InstanceDetailsStyles.genreLabelGroup ]}>
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
          <Carousel style={ InstanceDetailsStyles.carousel }>
            <Carousel.Item>
              <a href={coverURL} style={[ InstanceDetailsStyles.carouselCoverLink ]}>
                <img
                  src={coverURL}
                  alt={this.props.name}
                  style={[ InstanceDetailsStyles.carouselCoverImage ]}
                />
              </a>
            </Carousel.Item>
              {
                screenshots.map(_screenshot => screenshot(_screenshot))
              }
          </Carousel>
          <div style={[ InstanceDetailsStyles.secondaryDataCluster ]}>
            <div style={[ InstanceDetailsStyles.priceCluster ]}>
              <div style={[ InstanceDetailsStyles.priceIndicator ]}>
                {price != null ? 'Price:' : ''}&nbsp;
              </div>
              <div style={[ InstanceDetailsStyles.priceTag ]}>
                {price != null ? `${price}` : ''}
              </div>
            </div>
            <div style={[ InstanceDetailsStyles.metacriticCluster ]}>
              <div style={[ InstanceDetailsStyles.metacriticIndicator ]}>
                {this.props.metacritic ? 'Metacritic Score:' : ''}&nbsp;
              </div>
              <div style={[ InstanceDetailsStyles.metacriticScore(this.props.metacritic) ]}>
                {this.props.metacritic ? this.props.metacritic : ''}
              </div>
            </div>
            <div>
              GameFrame_Score_Placeholder
            </div>
          </div>
          <hr style={[ InstanceDetailsStyles.horizontalRule ]} />
          <div>
            <div style={[ InstanceDetailsStyles.synoposisIndicator ]}>
              Synoposis:
            </div>
            <div style={[ InstanceDetailsStyles.synoposisHTMLContainer ]}>
              {ReactHTMLParser(this.props.summary)}
            </div>
          </div>
          <hr style={[ InstanceDetailsStyles.horizontalRule ]} />
          <div style={[ InstanceDetailsStyles.platformCluster ]}>
            <div style={[ InstanceDetailsStyles.platformIndicator ]}>
              Platforms:&nbsp;
            </div>
            <div style={[ InstanceDetailsStyles.platformLabelGroup ]}>
              {
                platforms.map((platform) => {
                  return (
                    <span key={platform.name}>
                      <Label key={`${platform.name}-label`}>
                        {platform.name}
                      </Label>
                      &nbsp;
                    </span>
                  )
                })
              }
              {
                platforms == [] ? 'Unknown' : ''
              }
            </div>
          </div>
          <div style={[ InstanceDetailsStyles.externalGridCluster ]}>
            <div style={[ InstanceDetailsStyles.developerGridCluster('30%') ]}>
              <div style={[ InstanceDetailsStyles.developerIndicator ]}>
                Developers:
              </div>
              <Minigrid>
                {
                  this.props.developers.map(developer => link({
                    label: developer.name,
                    url: `/developers/${developer.id}`,
                    cover: (developer.logo && developer.logo.indexOf('http') < 0 ? `https://${developer.logo}` : developer.logo),
                    key: `developer-${developer.id}`,
                  }))
                }
              </Minigrid>
            </div>
            <div style={[ InstanceDetailsStyles.articleGridCluster('60%') ]}>
              <div style={[ InstanceDetailsStyles.articleIndicator ]}>
                Articles:
              </div>
              <Minigrid>
                {
                  this.props.articles.map(article => link({
                    label: article.title,
                    url: `/articles/${article.id}`,
                    cover: article.cover,
                    key: `article-${article.id}`,
                  }))
                }
              </Minigrid>
            </div>
          </div>
        </div>
        <div>
          <div style={[ InstanceDetailsStyles.twitterIndicator ]}>
            Twitter:
          </div>
          <p>Twitter is not available in your country.</p>
        </div>
        <div>
          <div style={[ InstanceDetailsStyles.youtubeIndicator ]}>
            YouTube:
          </div>
          <p>This video is not available in your country.</p>
        </div>
        <div>
          <div style={[ InstanceDetailsStyles.twitchIndicator ]}>
            Twitch:
          </div>
          <p>Twitch is not available in your country.</p>
        </div>
      </InstanceDetails>
      </StyleRoot>
    );
  }
}

export default Radium(Game);
