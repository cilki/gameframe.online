/**
 * Developer is a generic page template for Developers.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium, { StyleRoot } from 'radium';
import { Timeline } from 'react-twitter-widgets';
import InstanceDetails from '../instance-details/InstanceDetails';
import InstanceDetailsStyles from '../instance-details/InstanceDetailsStyles';
import Minigrid from '../minigrid/Minigrid';
import Minicard from '../minicard/Minicard';

/**
 * @description - Helper method for rendering a link to a developer or article
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.url
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

function twitter({ twitterUsername }) {
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

twitter.propTypes = {
  twitterUsername: PropTypes.string.isRequired,
};

function dateToString(date) {
  var dateType = new Date(Date.parse(date));
  var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  var sup = 'th';
  var day = dateType.getDate();
  if (day == 1 || day == 21 || day == 31) {
    sup = 'st';
  } else if (day == 2 || day == 22) {
    sup = 'nd';
  } else if (day == 3 || day == 23) {
    sup = 'rd';
  }

  var month = dateType.getMonth();
  var year = dateType.getFullYear();

  return (
    `${months[month]} ${day}${sup}, ${year}`
  );
}

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
    const established = this.props.foundation ? dateToString(this.props.foundation) : 'Unknown';
    const countryNumber = `${this.props.country}`;
    const country = this.iso.whereNumeric(countryNumber);
    const countryName = country ? country.country : 'Unknown';
    const twitterHandle = typeof this.props.twitter === 'string' ? `${this.props.twitter}`.replace('https://twitter.com/', '') : '';
    const twitterDummy = twitterHandle !== '' ? [this.props.twitter] : [];
    return (
      <StyleRoot>
        <InstanceDetails imageURL={logoURL}>
          <div style={[InstanceDetailsStyles.developerPrimaryDataCluster]}>
            <div style={[InstanceDetailsStyles.developerLogo]}>
              <div style={[InstanceDetailsStyles.developerLogoImageBoundingBox]}>
                <img
                  style={[InstanceDetailsStyles.developerLogoImage]}
                  src={logoURL}
                  alt={`${this.props.name} logo`}
                />
              </div>
            </div>
            <div style={[InstanceDetailsStyles.developerPrimaryInfoCluster]}>
              <div style={[InstanceDetailsStyles.titleText]}>
                {this.props.name}
              </div>
              <div style={[InstanceDetailsStyles.establishDateIndicator]}>
                {established !== 'Unknown' ? `Established ${established}` : 'Unknown date of establishment.'}
              </div>
              <div style={[InstanceDetailsStyles.locationIndicator]}>
                {countryName !== 'Unknown' ? `Based in ${countryName}` : 'Unkown location.'}
              </div>
            </div>
          </div>
          <div style={[InstanceDetailsStyles.bigButtonCluster]}>
            <a href={this.props.website} style={[InstanceDetailsStyles.bigButton]} key="website">
              Developer Website
            </a>
            <a href={this.props.twitter} style={[InstanceDetailsStyles.bigButton]} key="twitter">
              Developer Twitter
            </a>
          </div>
          <div style={[InstanceDetailsStyles.externalGridCluster]}>
            <div style={[InstanceDetailsStyles.gameGridCluster('50%')]}>
              <div style={[InstanceDetailsStyles.gameIndicator]}>
                Games:
              </div>
              <Minigrid>
                {
                  this.props.games.map(game => link({
                    label: game.name,
                    url: `/games/${game.id}`,
                    cover: (game.cover && game.cover.indexOf('http') < 0 ? `https://${game.cover}` : game.cover),
                    key: `game-${game.id}`,
                  }))
                }
              </Minigrid>
            </div>
            <div style={[InstanceDetailsStyles.articleGridCluster('50%')]}>
              <div style={[InstanceDetailsStyles.articleIndicator]}>
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
          <div style={{
            paddingTop: '2%',
            maxWidth: '50%',
        }}>
            {
              twitterDummy.map(() => twitter({
                twitterUsername: twitterHandle,
              }))
            }
          </div>
        </InstanceDetails>
      </StyleRoot>
    );
  }
}

export default Radium(Developer);
