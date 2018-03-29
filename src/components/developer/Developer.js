/**
 * Developer is a generic page template for Developers.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeveloperStyles from './DeveloperStyles';
import InstanceDetails from '../instance-details/InstanceDetails';
import InstanceDetailsStyles from '../instance-details/InstanceDetailsStyles';
import CommonAssets from '../../inline-styles/CommonAssets';

/**
 * @description - Helper method for rendering a link to a game or article
 * @param {Object} props
 * @param {String} url
 * @param {String} name
 * @returns {React.Component}
 */
function link({ label, url, cover, key }) {
  return (
    <Link key={`${key}-link`} to={url} style={ InstanceDetailsStyles.minigridLink }>
      <div key={`${key}-minicard`} style={[ InstanceDetailsStyles.minicard(cover) ]}>
        <div style={[ InstanceDetailsStyles.minicardTextArea ]}>
          <p style={[ InstanceDetailsStyles.minicardParagraph ]}>
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
    const established = this.props.foundation ? this.props.foundation : 'Unknown';
    const countryNumber = `${this.props.country}`;
    const country = this.iso.whereNumeric(countryNumber);
    const countryName = country ? country.country : 'Unknown';
    return (
      <InstanceDetails imageURL={logoURL}>
        <div style={[ InstanceDetailsStyles.developerPrimaryDataCluster ]}>
          <div style={[ InstanceDetailsStyles.developerLogo ]}>
            <div style={[ InstanceDetailsStyles.developerLogoImageBoundingBox ]}>
              <img
                style={[ InstanceDetailsStyles.developerLogoImage ]}
                src={logoURL}
                alt={`${this.props.name} logo`}
              />
            </div>
          </div>
          <div style={[ InstanceDetailsStyles.developerPrimaryInfoCluster ]}>
            <div style={[ InstanceDetailsStyles.titleText ]}>
              {this.props.name}
            </div>
            <div style={[ InstanceDetailsStyles.establishDateIndicator ]}>
            {established != 'Unknown' ? `Established ${established}` : 'Unknown date of establishment.'}
            </div>
            <div style={[ InstanceDetailsStyles.locationIndicator ]}>
              {countryName != 'Unknown' ? `Based in ${countryName}` : 'Unkown location.'}
            </div>
          </div>
        </div>
        <div style={[ InstanceDetailsStyles.bigButtonCluster ]}>
          <a href={this.props.website} style={[ InstanceDetailsStyles.bigButton ]} key='website'>
            Developer Website
          </a>
          <a href={this.props.twitter} style={[ InstanceDetailsStyles.bigButton ]} key='twitter'>
            Developer Twitter
          </a>
        </div>
        <div style={[ InstanceDetailsStyles.externalGridCluster ]}>
          <div style={[ InstanceDetailsStyles.developerGridCluster ]}>
            <div style={[ InstanceDetailsStyles.developerIndicator ]}>
              Games:
            </div>
            <div style={[ InstanceDetailsStyles.minigrid ]}>
              {
                this.props.games.map(game => link({
                  label: game.name,
                  url: `/games/${game.id}`,
                  cover: (game.cover && game.cover.indexOf('http') < 0 ? `https://${game.cover}` : game.cover),
                  key: `game-${game.id}`,
                }))
              }
            </div>
          </div>
          <div style={[ InstanceDetailsStyles.articleGridCluster ]}>
            <div style={[ InstanceDetailsStyles.articleIndicator ]}>
              Articles:
            </div>
            <div style={[ InstanceDetailsStyles.minigrid ]}>
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
      </InstanceDetails>
    );
  }
}

export default Radium(Developer);
