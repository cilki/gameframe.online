/**
 * Game is a generic page template for Games.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium, { StyleRoot } from 'radium';
import { Carousel, Label, Tooltip, OverlayTrigger } from 'react-bootstrap';
import ReactHTMLParser from 'react-html-parser';
import { Helmet } from 'react-helmet';

import InstanceDetails from '../instance-details/InstanceDetails';
import InstanceDetailsStyles from '../instance-details/InstanceDetailsStyles';
import Minigrid from '../minigrid/Minigrid';
import Minicard from '../minicard/Minicard';
import ExternalMinicard from '../minicard/ExternalMinicard';
import GameChart from './GameChart';

/**
 * @description - Helper method for generating a component to hold a screenshot
 * @param {Object} props
 * @param {String} props.url
 * @param {String} props.alt
 * @returns {React.Component}
 */
function screenshot({ url, alt }) {
  const src = url.indexOf('http') >= 0 ? url : `https://${url}`;
  return (
    <Carousel.Item key={`${url}-carousel-item`}>
      <a
        href={src}
        key={`${url}-a`}
        target="none"
        style={[InstanceDetailsStyles.carouselScreenshotLink]}
      >
        <img
          key={`${url}-image`}
          src={src}
          alt={alt}
          style={[InstanceDetailsStyles.carouselScreenshotImage]}
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
 * @description - Helper method for generating a component to hold an ESRB
 *                rating.
 * @param {Object} props
 * @param {Number} props.ratingKey
 * @returns {React.Component}
 */
function rating({ ratingKey }) {
  return (
    <a
      href="https://www.esrb.org/ratings/ratings_guide.aspx"
      key={`${ratingKey}-anchor`}
      target="none"
    >
      <img
        style={[InstanceDetailsStyles.esrbRatingImage]}
        alt={`${InstanceDetailsStyles.esrbMappings[`${ratingKey}alt`]}`}
        src={`${InstanceDetailsStyles.esrbMappings[ratingKey]}`}
        key={`${ratingKey}-image`}
      />
    </a>
  );
}

rating.propTypes = {
  ratingKey: PropTypes.number.isRequired,
};

/**
 * @description - Helper method for generating a component to hold a collection
 *                of genre labels.
 * @param {Object} props
 * @param {Array} props.genres
 * @returns {React.Component}
 */
function genreCluster({
  genres,
}) {
  return (
    <div style={[InstanceDetailsStyles.genreCluster]}>
      <div style={[InstanceDetailsStyles.genreIndicator]}>
        Genres:&nbsp;
      </div>
      <div style={[InstanceDetailsStyles.genreLabelGroup]}>
        {
          genres.map((genre) => {
            return (
              <span key={genre}>
                <a href={`/search?q=${genre}`}>
                  <Label key={`${genre}-label`}>
                    {genre}
                  </Label>
                </a>
                &nbsp;
              </span>
            );
          })
        }
      </div>
    </div>
  );
}

genreCluster.propTypes = {
  genres: PropTypes.array.isRequired,
};

/**
 * @description - Helper method for generating a component to hold primary
 *                information about a game.
 * @param {Object} props
 * @param {String} props.name
 * @param {String} props.release
 * @param {String}  props.genres
 * @returns {React.Component}
 */
function primaryInfoCluster({
  name,
  release,
  genres,
}) {
  const releaseDate = dateToString(release);
  const releasePrefix = Date.parse(release) < new Date() ? 'Released ' :
    'Coming ';

  return (
    <div style={[InstanceDetailsStyles.gamePrimaryInfoCluster]}>
      <div style={[InstanceDetailsStyles.titleText]}>
        {name}
      </div>
      <div style={[InstanceDetailsStyles.releaseDate]}>
        {releasePrefix} {releaseDate}
      </div>
      {genreCluster({ genres })}
    </div>
  );
}

primaryInfoCluster.propTypes = {
  name: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
};

/**
 * @description - Helper method for generating a component to hold secondary,
 *                less prominent information about a game.
 * @param {Object} props
 * @param {Number} props.price
 * @param {Number} props.vindex
 * @param {Number} props.metacriticScore
 * @param {String} props.metacriticLink
 * @param {Number} props.steamID
 * @param {Number} props._steamPlayers
 * @param {String} props.steamPlayersUpdated
 * @returns {React.Component}
 */
function secondaryDataCluster({
  price,
  vindex,
  metacriticScore,
  metacriticLink,
  steamID,
  _steamPlayers,
  steamPlayersUpdated,
}) {
  const _price = price ? `${price / 100}` : null;

  return (
    <div style={[InstanceDetailsStyles.secondaryDataCluster]}>
      <div style={[InstanceDetailsStyles.priceCluster]}>
        <div style={[InstanceDetailsStyles.priceIndicator]}>
          {_price !== null ? 'Price:' : 'Unknown Price'}&nbsp;
        </div>
        <div style={[InstanceDetailsStyles.priceTag]}>
          {_price !== null ? `\$${_price}` : ''}
        </div>
      </div>
      {vindex != undefined ? visibilityIndex(vindex) : ''}
      {metacriticScore ? metacritic({ metacriticScore, metacriticLink }) : ''}
      {
        steamID ? steamPlayers({
          _steamPlayers,
          steamID,
          steamPlayersUpdated,
        }) : ''
      }
    </div>
  );
}

secondaryDataCluster.propTypes = {
  price: PropTypes.number,
  vindex: PropTypes.number,
  metacriticScore: PropTypes.number,
  metacriticLink: PropTypes.string,
  steamID: PropTypes.number,
  _steamPlayers: PropTypes.number,
  steamPlayersUpdated: PropTypes.string,
};

/**
 * @description - Helper method for generating a component to hold the synopsis
 *                of a game.
 * @param {Object} props
 * @param {String} props.synopsis
 * @returns {React.Component}
 */
function synopsisSection({
  synopsis,
}) {
  return (
    <div>
      <hr style={[InstanceDetailsStyles.horizontalRule]} />
      <div>
        <div style={[InstanceDetailsStyles.synopsisIndicator]}>
            Synopsis:
        </div>
        <div style={[InstanceDetailsStyles.synopsisHTMLContainer]}>
          {ReactHTMLParser(synopsis)}
        </div>
      </div>
      <hr style={[InstanceDetailsStyles.horizontalRule]} />
    </div>
  );
}

synopsisSection.propTypes = {
  synopsis: PropTypes.string,
};

/**
 * @description - Helper method for generating a component to hold a screenshot
 *                carousel/gallery component.
 * @param {Object} props
 * @param {Array} props.screenshots
 * @returns {React.Component}
 */
function screenshotGallery({
  screenshots,
}) {
  const _screenshots = screenshots || [];

  return (
    <Carousel style={InstanceDetailsStyles.carousel}>
      {
        _screenshots.map(_screenshot => screenshot(_screenshot))
      }
    </Carousel>
  );
}

screenshotGallery.propTypes = {
  screenshots: PropTypes.array,
};

/**
 * @description - Helper method for rendering a link to a developer or article.
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.url
 * @param {String} props.cover
 * @param {String} props.key
 * @returns {React.Component}
 */
function link({
  label,
  url,
  cover,
  key,
}) {
  return (
    <Minicard
      label={label}
      url={url}
      cover={cover}
      cardKey={`${key}-inner`}
      key={key}
    />
  );
}

link.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  key: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
};

/**
 * @description - Helper method for rendering a link to an external location.
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.url
 * @param {String} props.cover
 * @param {String} props.key
 * @returns {React.Component}
 */
function externalLink({
  label,
  url,
  cover,
  key,
}) {
  return (
    <ExternalMinicard
      label={label}
      url={url}
      cover={cover}
      cardKey={`${key}-inner`}
      key={key}
    />
  );
}

externalLink.propTypes = {
  label: PropTypes.object.isRequired,//eslint-disable-line
  url: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  key: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
};

/**
 * @description - Helper method for converting an ISO 8601 formatted date
 *                string to a natural language string.
 * @param {Object} props
 * @param {String} props.date
 * @returns {String}
 */
function dateToString(date) {
  const dateType = new Date(Date.parse(date));
  const months = ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];
  let sup = '';
  const day = dateType.getDate();
  if (day === 1 || day === 21 || day === 31) {
    sup = 'st';
  } else if (day === 2 || day === 22) {
    sup = 'nd';
  } else if (day === 3 || day === 23) {
    sup = 'rd';
  } else {
    sup = 'th';
  }

  const month = dateType.getMonth();
  const year = dateType.getFullYear();

  return (
    `${months[month]} ${day}${sup}, ${year}`
  );
}

dateToString.propTypes = {
  date: PropTypes.string.isRequired,
};

/**
 * @description - Helper method for generating a clickable button element.
 * @param {Object} props
 * @param {String} props.url
 * @param {String} props.label
 * @param {String} props.buttonKey
 * @returns {React.Component}
 */
function bigButton({
  url,
  label,
  buttonKey,
}) {
  return (
    <a
      href={url}
      style={[InstanceDetailsStyles.bigButton]}
      key={`${buttonKey}-anchor`}
      target="none"
    >
      {label}
    </a>
  );
}

bigButton.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  buttonKey: PropTypes.string.isRequired,
};

/**
 * @description - Helper method for generating a component to hold the
 *                visibility index for a game.
 * @param {Object} props
 * @param {Number} props.vindex
 * @returns {React.Component}
 */
function visibilityIndex(vindex) {
  const visibilityIndexTooltip = (
    <Tooltip id="visibilityIndexTooltip">
      A visibility metric computed by GameFrame ranging from 0 (least visible) to 100 (most visible)
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={visibilityIndexTooltip}>
      <div style={[InstanceDetailsStyles.currentPlayers]}>
        <img
          src="../../static/images/minilogo.svg"
          style={[InstanceDetailsStyles.metacriticIndicator]}
          alt="Metacritic Score:"
        />
        <b>{vindex}</b>
      </div>
    </OverlayTrigger>
  );
}

visibilityIndex.propTypes = {
  vindex: PropTypes.number,
};

/**
 * @description - Helper method for generating a component to hold a Metacritic
 *                score for a game.
 * @param {Object} props
 * @param {Number} props.metacriticScore
 * @param {String} props.metacriticLink
 * @returns {React.Component}
 */
function metacritic({
  metacriticScore,
  metacriticLink,
}) {
  const metacriticTooltip = (
    <Tooltip id="metacriticTooltip">
      A rating computed by Metacritic ranging from 0 to 100
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={metacriticTooltip}>
      <a
        href={metacriticLink}
        target="none"
        style={{
          textDecoration: 'inherit',
          color: 'inherit',
        }}
      >
        <div style={[InstanceDetailsStyles.metacriticCluster]}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg"
            style={[InstanceDetailsStyles.metacriticIndicator]}
            alt="Metacritic Score:"
          />
          <div style={[InstanceDetailsStyles.metacriticScore(metacriticScore)]}>
            {metacriticScore}
          </div>
        </div>
      </a>
    </OverlayTrigger>
  );
}

metacritic.propTypes = {
  metacriticScore: PropTypes.number,
  metacriticLink: PropTypes.string,
};

/**
 * @description - Helper method for generating a component to hold the number
 *                of people playing a game on Steam, if applicable.
 * @param {Object} props
 * @param {Number} props.playerCount
 * @param {Number} props.steamID
 * @param {String} props.steamPlayersUpdated
 * @returns {React.Component}
 */
function steamPlayers({ playerCount, steamID, steamPlayersUpdated }) {
  const steamPlayersTooltip = (
    <Tooltip id="steamPlayersTooltip">
      {`The number of Steam players currently playing this game (Last updated: ${steamPlayersUpdated})`}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={steamPlayersTooltip}>
      <a
        href={`http://www.steamcharts.com/app/${steamID}`}
        target="none"
        style={{ textDecoration: 'inherit', color: 'inherit' }}
      >
        <div style={[InstanceDetailsStyles.currentPlayers]}>
          <img
            style={{
              height: 'calc(20px + 0.5vw)',
              paddingTop: '2%',
              marginRight: '4px',
              width: 'auto',
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
          />
          <b>{playerCount}</b>&nbsp;players
        </div>
      </a>
    </OverlayTrigger>
  );
}

steamPlayers.propTypes = {
  playerCount: PropTypes.number,
  steamID: PropTypes.number,
  steamPlayersUpdated: PropTypes.string,
};

/**
 * @description - Helper method for generating a component to hold a collection
 *                of platform labels.
 * @param {Object} props
 * @param {Array}  props.platforms
 * @returns {React.Component}
 */
function platformCluster({
  platforms,
}) {
  const _platforms = platforms || [];

  return (
    <div style={[InstanceDetailsStyles.platformCluster]}>
      <div style={[InstanceDetailsStyles.platformIndicator]}>
        Platforms:&nbsp;
      </div>
      <div style={[InstanceDetailsStyles.platformLabelGroup]}>
        {
          _platforms.map((platform) => {
            return (
              <span key={platform.name}>
                <a href={`/search?q=${platform.name}`}>
                  <Label key={`${platform.name}-label`}>
                    {platform.name}
                  </Label>
                </a>
                &nbsp;
              </span>
            );
          })
        }
        {
          _platforms === [] ? 'Unknown' : ''
        }
      </div>
    </div>
  );
}

platformCluster.propTypes = {
  platforms: PropTypes.array.isRequired,
};

/**
 * @description - Helper method for generating a component to hold a rating for
 *                a game.
 * @param {Object} props
 * @param {String} props._rating
 * @returns {React.Component}
 */
function ratingContainer({
  _rating,
}) {
  const esrb = _rating ? [_rating] : [];

  return (
    <div style={[InstanceDetailsStyles.esrbRatingContainer]}>
      {
        esrb.map(esrbRating => rating({
          ratingKey: esrbRating,
          key: `esrbRating-${esrbRating}`,
        }))
      }
    </div>
  );
}

ratingContainer.propTypes = {
  _rating: PropTypes.string,
};

/**
 * @description - Helper method for generating a component to hold other
 *                components that are intended to share the same section of a
 *                page.
 * @param {Object} props
 * @param {Array} props.platforms
 * @param {Array} props.videos
 * @param {Array} props.articles
 * @param {Array} props.tweets
 * @returns {React.Component}
 */
function platformVideoContainer({
  platforms, videos, articles, tweets,
}) {
  return (
    <div style={[InstanceDetailsStyles.platformRatingContainer]}>
      {platformCluster({ platforms })}
      <div style={[InstanceDetailsStyles.platformIndicator]}>
        YouTube video releases over time:
      </div>
      <div
        style={{
          display: 'flex',
          height: '100%',
          maxHeight: '100%',
        }}
      >
        <GameChart {...{ videos, articles, tweets }} />
      </div>
      {/* ratingContainer({ _rating: _rating }) */}
    </div>
  );
}

platformVideoContainer.propTypes = {
  platforms: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
  tweets: PropTypes.array.isRequired,
};

/**
 * @description - Helper method for generating a component to hold a Google
 *                Trends chart for a given keyword.
 * @param {Object} props
 * @param {String} props.keyWord
 * @returns {React.Component}
 */
function googleTrendsContainer({
  keyWord,
}) {
  const trendName = encodeURI(keyWord);
  const trendsURL = `https://trends.google.com:443/trends/embed/explore/TIMESERIES?req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22${trendName}%22%2C%22geo%22%3A%22%22%2C%22time%22%3A%22all%22%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&tz=300&amp;eq=date%3Dall%26q%3D${trendName}`;

  return (
    <div style={[InstanceDetailsStyles.googleTrendsContainer]}>
      <iframe
        id="trends-widget-1"
        src={trendsURL}
        width="100%"
        frameBorder="0"
        scrolling="0"
        style={[InstanceDetailsStyles.googleTrendsIframe]}
        title={`Google Trends for ${keyWord}`}
      />
    </div>
  );
}

googleTrendsContainer.propTypes = {
  keyWord: PropTypes.string,
};

/**
 * @description - Helper method for generating a component to hold a minigrid
 *                within a portion of the page intended to display developers.
 * @param {Object} props
 * @param {Array} props.developers
 * @returns {React.Component}
 */
function developerGridCluster({
  developers,
}) {
  return (
    <div style={[InstanceDetailsStyles.developerGridCluster('30%')]}>
      <div style={[InstanceDetailsStyles.developerIndicator]}>
        Developers:
      </div>
      <Minigrid>
        {
          developers.map(developer => link({
            label: developer.name,
            url: `/developers/${developer.id}`,
            cover: (developer.logo && developer.logo.indexOf('http') < 0 ?
                   `https://${developer.logo}` : developer.logo),
            key: `developer-${developer.id}`,
          }))
        }
      </Minigrid>
    </div>
  );
}

developerGridCluster.propTypes = {
  developers: PropTypes.array.isRequired,
};

/**
 * @description - Helper method for generating a component to hold a minigrid
 *                within a portion of the page intended to display articles.
 * @param {Object} props
 * @param {Array} props.articles
 * @returns {React.Component}
 */
function articleGridCluster({
  articles,
}) {
  return (
    <div style={[InstanceDetailsStyles.articleGridCluster('60%')]}>
      <div style={[InstanceDetailsStyles.articleIndicator]}>
        Articles:
      </div>
      <Minigrid>
        {
          articles.map(article => link({
            label: article.title,
            url: `/articles/${article.id}`,
            cover: article.cover,
            key: `article-${article.id}`,
          }))
        }
      </Minigrid>
    </div>
  );
}

articleGridCluster.propTypes = {
  articles: PropTypes.array.isRequired,
};

/**
 * @description - Helper method for generating a component to hold both the
 *                developer and article model minigrids.
 * @param {Object} props
 * @param {Array} props.developers
 * @param {Array} props.articles
 * @returns {React.Component}
 */
function modelGridClusters({
  developers,
  articles,
}) {
  return (
    <div style={[InstanceDetailsStyles.externalGridCluster]}>
      {developerGridCluster({ developers })}
      {articleGridCluster({ articles })}
    </div>
  );
}

modelGridClusters.propTypes = {
  developers: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
};

/**
 * @description - Helper method for generating a component to contain a
 *                minigrid of videos.
 * @param {Object} props
 * @param {Array} props.videos
 * @returns {React.Component}
 */
function videoGridCluster({
  videos,
}) {
  return (
    <div style={[InstanceDetailsStyles.externalGridCluster]}>
      <div style={[InstanceDetailsStyles.gameGridCluster('100%')]}>
        <div style={[InstanceDetailsStyles.gameIndicator]}>
          Videos:
        </div>
        <Minigrid>
          {
            videos.map(video => externalLink({
              label: video.name,
              url: video.video_link,
              cover: (video.thumbnail && video.thumbnail.indexOf('http') < 0 ?
                       `https://${video.thumbnail}` : video.thumbnail),
              key: `video-${video.video_id}`,
            }))
          }
        </Minigrid>
      </div>
    </div>
  );
}

videoGridCluster.propTypes = {
  videos: PropTypes.array.isRequired,
};

/**
 * @description - Helper method for generating a clickable button linking to a
 *                game's Steam page, if applicable.
 * @param {Object} props
 * @param {Number} props.steamID
 * @returns {React.Component}
 */
function steamBigButton({
  steamID,
}) {
  const steamIDs = steamID ? [steamID] : [];

  return (
    <div>
      {
        steamIDs.map(steamID => bigButton({
          url: `https://store.steampowered.com/app/${steamID}/`,
          label: 'View on Steam',
          buttonKey: `steamButton-${steamID}`,
        }))
      }
    </div>
  );
}

steamBigButton.propTypes = {
  steamID: PropTypes.number,
};

/**
 * @description - Helper method for generating a clickable button linking to a
 *                game's IGDB page, if applicable.
 * @param {Object} props
 * @param {String} props.igdbLink
 * @returns {React.Component}
 */
function igdbBigButton({
  igdbLink,
}) {
  const igdbLinks = igdbLink ? [igdbLink] : [];

  return (
    <div>
      {
        igdbLinks.map(igdbLink => bigButton({
          url: igdbLink,
          label: 'View on IGDB',
          buttonKey: `igdbButton-${igdbLink}`,
        }))
      }
    </div>
  );
}

igdbBigButton.propTypes = {
  igdbLink: PropTypes.string,
};

/**
 * @description - Helper method for generating a component to hold up to two
 *                large clickable buttons.
 * @param {Object} props
 * @param {Object} props.left
 * @param {Object} props.right
 * @returns {React.Component}
 */
function bigButtonCluster({
  left,
  right,
}) {
  return (
    <div style={[InstanceDetailsStyles.bigButtonCluster]}>
      {steamBigButton({ steamID: left })}
      {igdbBigButton({ igdbLink: right })}
    </div>
  );
}

bigButtonCluster.propTypes = {
  left: PropTypes.object,
  right: PropTypes.object,
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
    esrb: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    igdb_link: PropTypes.string,
    metacritic: PropTypes.number,
    metacritic_link: PropTypes.string,
    name: PropTypes.string,
    platforms: PropTypes.arrayOf(PropTypes.shape({
      platform_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    price: PropTypes.number,
    release: PropTypes.string,
    // we don't currently use this right now, but we may in the future
    requested: PropTypes.bool, //eslint-disable-line
    screenshots: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })),
    steam_id: PropTypes.number,
    steam_players_updated: PropTypes.string,
    summary: PropTypes.string,
    videos: PropTypes.arrayOf(PropTypes.shape({
      channel: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      video_id: PropTypes.number.isRequired,
      video_link: PropTypes.string.isRequired,
      youtube_id: PropTypes.string.isRequired,
    })),
    vindex: PropTypes.number,
    fetchGame: PropTypes.func.isRequired,
  };

  static defaultProps = {
    articles: [],
    cover: null,
    developers: [],
    error: null,
    esrb: null,
    genres: [],
    igdb_link: null,
    metacritic: 0,
    metacritic_link: null,
    name: '',
    platforms: [],
    price: 662.6070040,
    release: '',
    requested: false,
    screenshots: [{ url: '', alt: '' }],
    steam_id: null,
    steam_players_updated: 'Never',
    summary: null,
    vindex: 0,
    videos: [],
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};

    // this.steamApi = require('steam-api');
    // this.userStats = new this.steamApi.UserStats('B742258BCF24425642B7E0C770450FC2');
  }

  componentDidMount() {
    this.props.fetchGame();
  }

  render() {
    const coverURL = this.props.cover && this.props.cover.indexOf('http') < 0 ?
      `https://${this.props.cover}` : this.props.cover;

    return (
      <StyleRoot>
        <Helmet>
          <title>{`${this.props.name} - GameFrame.online`}</title>
        </Helmet>
        <InstanceDetails imageURL={coverURL}>
          <div style={[InstanceDetailsStyles.gamePrimaryDataCluster]}>
            <div style={[InstanceDetailsStyles.gameCover]}>
              <div style={[InstanceDetailsStyles.gameCoverImageBoundingBox]}>
                <img
                  style={[InstanceDetailsStyles.gameCoverImage]}
                  src={coverURL}
                  alt={`${this.props.name} logo`}
                />
              </div>
            </div>
            {
              primaryInfoCluster({
                name: this.props.name,
                release: this.props.release,
                genres: this.props.genres,
              })
            }
            {this.props.esrb ? rating({ ratingKey: this.props.esrb }) : ''}
            {
              screenshotGallery({
                screenshots: this.props.screenshots,
              })
            }
            {
              secondaryDataCluster({
                price: this.props.price,
                vindex: this.props.vindex,
                metacriticScore: this.props.metacritic,
                metacriticLink: this.props.metacritic_link,
                steamID: this.props.steam_id,
                _steamPlayers: this.props.steam_players,
                steamPlayersUpdated: this.props.steam_players_updated,
              })
            }
            {
              synopsisSection({
                synopsis: this.props.summary,
              })
            }
            {
              platformVideoContainer({
                platforms: this.props.platforms,
                videos: this.props.videos,
                articles: this.props.articles,
                tweets: this.props.tweets,
              })
            }
            {
              googleTrendsContainer({
                keyWord: this.props.c_name,
              })
            }
            {
              modelGridClusters({
                developers: this.props.developers,
                articles: this.props.articles,
              })
            }
          </div>
          {
            videoGridCluster({
              videos: this.props.videos,
            })
          }
          {
            bigButtonCluster({
              left: this.props.steam_id,
              right: this.props.igdb_link,
            })
          }
        </InstanceDetails>
      </StyleRoot>
    );
  }
}

export default Radium(Game);
