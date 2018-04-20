/**
 * Developer is a generic page template for Developers.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium, { StyleRoot } from 'radium';
import { Timeline } from 'react-twitter-widgets';
import { Helmet } from 'react-helmet';

import InstanceDetails from '../instance-details/InstanceDetails';
import InstanceDetailsStyles from '../instance-details/InstanceDetailsStyles';
import Minigrid from '../minigrid/Minigrid';
import Minicard from '../minicard/Minicard';

/**
 * @description - Helper method for rendering a link to a developer or article
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.url
 * @param {String} props.cover
 * @param {String} props.key
 * @returns {React.Component}
 */
function link({
  label, url, cover, key,
}) {
  return (
    <Minicard label={label} url={url} cover={cover} cardKey={`${key}-inner`} key={key} />
  );
}

link.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  key: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
};

/**
 * @description - Helper method for generating a component to hold a Twitter
 *                stream for a given Twitter account name.
 * @param {Object} props
 * @param {String} props.twitterUsername
 * @returns {React.Component}
 */
function twitterWidget({ twitterUsername }) {
  return (
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: twitterUsername,
      }}
      options={{
        username: twitterUsername,
        height: '60vh',
      }}
      key={`${twitterUsername}-timeline`}
    />
  );
}

twitterWidget.propTypes = {
  twitterUsername: PropTypes.string.isRequired,
};

/**
 * @description - Helper method for converting an ISO 8601 formatted date
 *                string into a natural language string.
 * @param {Object} props
 * @param {String} props.date
 * @returns {React.Component}
 */
function dateToString(date) {
  const dateType = new Date(Date.parse(date));
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let sup = 'th';
  const day = dateType.getDate();
  if (day === 1 || day === 21 || day === 31) {
    sup = 'st';
  } else if (day === 2 || day === 22) {
    sup = 'nd';
  } else if (day === 3 || day === 23) {
    sup = 'rd';
  }

  const month = dateType.getMonth();
  const year = dateType.getFullYear();

  return (
    `${months[month]} ${day}${sup}, ${year}`
  );
}

/**
 * @description - Helper method for generating a component to hold primary
 *                information about a developer.
 * @param {Object} props
 * @param {String} props.name
 * @param {String} props.foundation
 * @param {String} props.country
 * @returns {React.Component}
 */
function primaryInfoCluster({
  name,
  foundation,
  country,
}) {

  let iso = require('iso-3166-1'); //eslint-disable-line

  const established = foundation ? dateToString(foundation) : 'Unknown';
  const countryNumber = `${country}`;
  const _country = iso.whereNumeric(countryNumber);
  const countryName = _country ? _country.country : 'Unknown';

  return (
    <div style={[InstanceDetailsStyles.developerPrimaryInfoCluster]}>
      <div style={[InstanceDetailsStyles.titleText]}>
        {name}
      </div>
      <div style={[InstanceDetailsStyles.establishDateIndicator]}>
        {established !== 'Unknown' ? `Established ${established}` : 'Unknown date of establishment.'}
      </div>
      <div style={[InstanceDetailsStyles.locationIndicator]}>
        {countryName !== 'Unknown' ? `Based in ${countryName}` : 'Unkown location.'}
      </div>
    </div>
  );
}

primaryInfoCluster.propTypes = {
  name: PropTypes.string,
  foundation: PropTypes.string,
  country: PropTypes.string,
};

/**
 * @description - Helper method for generating a component to hold the
 *                description of a developer.
 * @param {Object} props
 * @param {String} props.description
 * @returns {React.Component}
 */
function descriptionSection({
  description,
}) {

  return (
    <div>
      <hr style={[InstanceDetailsStyles.horizontalRule]} />
      <div style={[InstanceDetailsStyles.synopsisIndicator]}>
        Description:
      </div>
      <div style={[InstanceDetailsStyles.synopsisHTMLContainer]}>
        {description}
      </div>
      <hr style={[InstanceDetailsStyles.horizontalRule]} />
    </div>
  );
}

descriptionSection.propTypes = {
  description: PropTypes.string,
};

/**
 * @description - Helper method for generating a clickable button linking to a
 *                website belonging to a developer.
 * @param {Object} props
 * @param {String} props.website
 * @returns {React.Component}
 */
function websiteButton({
  website,
}) {

  if (website) {
    return (
      <a href={website} style={[InstanceDetailsStyles.bigButton]} key="website">
        Developer Website
      </a>
    );
  }
  return '';
}

websiteButton.propTypes = {
  website: PropTypes.string,
};

/**
 * @description - Helper method for generating a clickable button linking to
 *                the Twitter feed for a developer.
 * @param {Object} props
 * @param {String} props.twitter
 * @returns {React.Component}
 */
function twitterButton({
  twitter,
}) {

  if (twitter) {
    return (
      <a href={twitter} style={[InstanceDetailsStyles.bigButton]} key="twitter">
        Developer Twitter
      </a>
    );
  }
  return '';
}

twitterButton.propTypes = {
  twitter: PropTypes.string,
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
      {websiteButton({ website: left })}
      {twitterButton({ twitter: right })}
    </div>
  );
}

bigButtonCluster.propTypes = {
  left: PropTypes.object,
  right: PropTypes.object,
};

/**
 * @description - Helper method for generating a component to hold one or more
 *                widgets in a single section of the page.
 * @param {Object} props
 * @param {String} props.twitter
 * @param {String} props.name
 * @returns {React.Component}
 */
function developerWidgetGroup({
  twitter,
  name,
}) {

  const twitterHandle = typeof twitter === 'string' ? `${twitter}`.replace('https://twitter.com/', '') : '';
  const twitterDummy = twitterHandle !== '' ? [twitter] : [];
  const trendName = encodeURI(name);
  const trendsURL = `https://trends.google.com:443/trends/embed/explore/TIMESERIES?req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22${trendName}%22%2C%22geo%22%3A%22%22%2C%22time%22%3A%22all%22%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&tz=300&amp;eq=date%3Dall%26q%3D${trendName}`;

  return (
    <div style={[InstanceDetailsStyles.developerWidgetGroup]}>
      <div style={[InstanceDetailsStyles.developerTwitterContainer]}>
        {
          twitterDummy.map(() => twitterWidget({
            twitterUsername: twitterHandle,
          }))
        }
      </div>
      <div style={[InstanceDetailsStyles.googleTrendsContainer]}>
        <iframe
          id="trends-widget-1"
          src={trendsURL}
          width="100%"
          frameBorder="0"
          scrolling="0"
          style={[InstanceDetailsStyles.googleTrendsIframe]}
          title="Google Trends"
        />
      </div>
    </div>
  );
}

developerWidgetGroup.propTypes = {
  twitter: PropTypes.string,
  name: PropTypes.string,
};

/**
 * @description - Helper method for generating a component to hold a minigrid
 *                within a portion of the page intended to display games.
 * @param {Object} props
 * @param {Array} props.games
 * @returns {React.Component}
 */
function gameGridCluster({
  games,
}) {
  return (

    <div style={[InstanceDetailsStyles.gameGridCluster('50%')]}>
      <div style={[InstanceDetailsStyles.gameIndicator]}>
        Games:
      </div>
      <Minigrid>
        {
          games.map(game => link({
            label: game.name,
            url: `/games/${game.id}`,
            cover: (game.cover && game.cover.indexOf('http') < 0 ? `https://${game.cover}` : game.cover),
            key: `game-${game.id}`,
          }))
        }
      </Minigrid>
    </div>
  );
}

gameGridCluster.propTypes = {
  games: PropTypes.array,
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
    <div style={[InstanceDetailsStyles.articleGridCluster('50%')]}>
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
  articles: PropTypes.array,
};

/**
 * @description - Helper method for generating a component to hold both the
 *                game and article model minigrids.
 * @param {Object} props
 * @param {Array} props.games
 * @param {Array} props.articles
 * @returns {React.Component}
 */
function modelGridClusters({
  games,
  articles,
}) {

  return (
    <div style={[InstanceDetailsStyles.externalGridCluster]}>
      {gameGridCluster({ games: games, })}
      {articleGridCluster({ articles: articles })}
    </div>
  );
}

modelGridClusters.propTypes = {
  games: PropTypes.array,
  articles: PropTypes.array,
};

/**
 * @description - Returns the main component to render a developer's own
 * page
 * @param {Object} props
 * @returns {React.Component}
 */
class Developer extends React.Component {
  static propTypes = {
    // this is derived state using selectors
    articles: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })),
    name: PropTypes.string.isRequired,
    // this is derived state using selectors
    games: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })),
    country: PropTypes.string,
    description: PropTypes.string,
    logo: PropTypes.string,
    twitter: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), //eslint-disable-line
    foundation: PropTypes.string,
    website: PropTypes.string,
    // we currently don't use these but we may in the future
    error: PropTypes.string, //eslint-disable-line
    requested: PropTypes.bool, //eslint-disable-line

    fetchDeveloper: PropTypes.func.isRequired,
  };

  static defaultProps = {
    articles: [],
    name: '',
    games: [],
    country: '',
    description: '',
    logo: null,
    twitter: {},
    foundation: '',
    website: '',
    error: null,
    requested: false,
  };


  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
    };

    this.iso = require('iso-3166-1'); //eslint-disable-line
  }

  componentDidMount() {
    this.props.fetchDeveloper();
  }

  render() {
    const logoURL = this.props.logo && this.props.logo.indexOf('http') < 0 ? `https://${this.props.logo}` : this.props.logo;
    const trueLogoURL = this.props.logo == null ? '../../static/images/noImage.png' : logoURL;
    return (
      <StyleRoot>
        <Helmet>
          <title>{`${this.props.name} - GameFrame.online`}</title>
        </Helmet>
        <InstanceDetails imageURL={trueLogoURL}>
          <div style={[InstanceDetailsStyles.developerPrimaryDataCluster]}>
            <div style={[InstanceDetailsStyles.developerLogo]}>
              <div style={[InstanceDetailsStyles.developerLogoImageBoundingBox]}>
                <img
                  style={[InstanceDetailsStyles.developerLogoImage]}
                  src={trueLogoURL}
                  alt={`${this.props.name} logo`}
                />
              </div>
            </div>
            {
              primaryInfoCluster({
                name: this.props.name,
                foundation: this.props.foundation,
                country: this.props.country,
              })  
            }
          </div>
          {
            descriptionSection({
              description: this.props.description,
            })
          }
          {
            bigButtonCluster({
              left: this.props.website,
              right: this.props.twitter,
            })
          }
          {
            developerWidgetGroup({
              twitter: this.props.twitter,
              name: this.props.name,
            })
          }
          {
            modelGridClusters({
              games: this.props.games,
              articles: this.props.articles,
            })
          }
        </InstanceDetails>
      </StyleRoot>
    );
  }
}

export default Radium(Developer);
