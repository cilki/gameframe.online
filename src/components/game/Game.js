/**
 * Game is a generic page template for Games.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium, { StyleRoot } from 'radium';
import { Carousel, Label, Tooltip, OverlayTrigger } from 'react-bootstrap';
import ReactHTMLParser from 'react-html-parser';
import InstanceDetails from '../instance-details/InstanceDetails';
import InstanceDetailsStyles from '../instance-details/InstanceDetailsStyles';
import Minigrid from '../minigrid/Minigrid';
import Minicard from '../minicard/Minicard';
import ExternalMinicard from '../minicard/ExternalMinicard';

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
      <a href={src} key={`${url}-a`}
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

function rating({ ratingKey }) {
  return (
    <a href="https://www.esrb.org/ratings/ratings_guide.aspx"
      key={`${ratingKey}-anchor`}
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

function primaryInfoCluster({
  name,
  release,
  genres
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

function secondaryDataCluster({
  price,
  vindex,
  metacriticScore,
  steamID,
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
      {metacriticScore ? metacritic(metacriticScore) : ''}
      {steamID ? steamPlayers(steamID) : ''}
    </div>
  );
}

secondaryDataCluster.propTypes = {
  price: PropTypes.number,
  vindex: PropTypes.number,
  metacriticScore: PropTypes.number,
  steamID: PropTypes.number,
};

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

function screenshotGallery({
  screenshots
}) {

  const _screenshots = screenshots ? screenshots : [];

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
 * @description - Helper method for rendering a link to a developer or article
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.url
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
 * @description - Helper method for rendering a link to an external location
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.url
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

function bigButton({
  url,
  label,
  buttonKey
}) {
  return (
    <a href={url}
      style={[InstanceDetailsStyles.bigButton]}
      key={`${buttonKey}-anchor`}
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

function visibilityIndex(vindex) {
  const visibilityIndexTooltip = (
    <Tooltip id="visibilityIndexTooltip">
      A popularity metric generated by GameFrame based on various factors
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={visibilityIndexTooltip}>
      <div style={[InstanceDetailsStyles.currentPlayers]}>
        Visibility Index:&nbsp;
        <b>{vindex}</b>
      </div>
    </OverlayTrigger>
  );
}

visibilityIndex.propTypes = {
  vindex: PropTypes.number,
};

function metacritic(metacriticScore) {
  const metacriticTooltip = (
    <Tooltip id="metacriticTooltip">
      The game's rating according to Metacritic, on a scale of 0 to 100
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={metacriticTooltip}>
      <div style={[InstanceDetailsStyles.metacriticCluster]}>
        <a href="http://www.metacritic.com">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg"
            style={[InstanceDetailsStyles.metacriticIndicator]}
            alt="Metacritic Score:"
          />
        </a>
        <div style={[InstanceDetailsStyles.metacriticScore(metacriticScore)]}>
          {metacriticScore}
        </div>
      </div>
    </OverlayTrigger>
  );
}

metacritic.propTypes = {
  metacriticScore: PropTypes.number,
};

function steamPlayers(playerCount) {
  const steamPlayersTooltip = (
    <Tooltip id="steamPlayersTooltip">
      A regularly updated count of people currently playing this game on Steam
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={steamPlayersTooltip}>
      <div style={[InstanceDetailsStyles.currentPlayers]}>
        <img
          style={{
            height: 'calc(20px + 0.5vw)',
            paddingTop: '2%',
            marginRight: '4px',
            width: 'auto'
          }}
          src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
        />
        <b>{playerCount}</b>&nbsp;players
      </div>
    </OverlayTrigger>
  );
}

steamPlayers.propTypes = {
  playerCount: PropTypes.number,
};

function platformCluster({
  platforms,
}) {
  const _platforms = platforms ? platforms : [];

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
  platforms:  PropTypes.array.isRequired,
};

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

function platformRatingContainer({
  platforms, _rating,
}) {

  return (
    <div style={[InstanceDetailsStyles.platformRatingContainer]}>
      {platformCluster({ platforms: platforms })}
      {ratingContainer({ _rating: _rating })}
    </div>
  );
}

platformRatingContainer.propTypes = {
  platforms: PropTypes.array.isRequired,
  _rating: PropTypes.string,
};

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

function modelGridClusters({
  developers,
  articles,
}) {
  return (
    <div style={[InstanceDetailsStyles.externalGridCluster]}>
      {developerGridCluster({ developers: developers })}
      {articleGridCluster({ articles: articles })}
    </div>
  );
}

modelGridClusters.propTypes = {
  developers: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
};

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
    genres: PropTypes.arrayOf(PropTypes.shape({
      genre_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    igdb_link: PropTypes.string,
    metacritic: PropTypes.number,
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
    name: '',
    platforms: [],
    price: 662.6070040,
    release: '',
    requested: false,
    screenshots: [{ url: '', alt: '' }],
    steam_id: null,
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
    // this.userStats.GetNumberOfCurrentPlayers('3600').done(function(result){
    //  console.log(result);
    // });
    return (
      <StyleRoot>
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
                steamID: this.props.steam_id,
              })
            }
            {
              synopsisSection({
                synopsis: this.props.summary,
              })
            }
            {
              platformRatingContainer({
                platforms: this.props.platforms,
                _rating: this.props.esrb,
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
