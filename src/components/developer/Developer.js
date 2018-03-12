/**
 * Developer is a generic page template for Developers.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DeveloperStyles from './DeveloperStyles';
import InstanceDetails from '../InstanceDetails';

/**
 * @description - Creates links for a developer
 * @param {Object} props
 * @param {String} url
 * @param {String} name
 * @returns {React.Component}
 */
function link({ url, name }) {
  return (
    <Link
      to={url}
      style={{
        textDecoration: 'none',
      }}
    >
      <Label>{name}</Label>
    </Link>
  );
}

link.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

/**
 * @description - Creates and returns a react component for
 * a single developer's instance page
 * @param {Object} props
 * @returns {React.Component}
 */
function Developer(props) {
  return (
    <InstanceDetails
      style={{
        container: undefined,
        border: DeveloperStyles.border,
        jumboTron: DeveloperStyles.jumboTron,
      }}
      twitterWidget={props.twitter}
    >
      <h1
        style={[DeveloperStyles.name]}
      >
        {props.developer}
        <div
          style={[DeveloperStyles.logo]}
        >
          <img
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            src={props.logoURL}
            alt={`${props.developer} logo`}
          />
        </div>
      </h1>
      <div
        style={[DeveloperStyles.secondaryInfo]}
      >
        <p>Established: {props.year}</p>
        <p>Location: {props.loc}</p>
      </div>

      <div
        style={[DeveloperStyles.about]}
      >
        <p>{props.about}</p>
      </div>
      <div style={[DeveloperStyles.games]}>
        <h3>Games:</h3>
        <p>
          {
            props.games.map(_game => link(_game))
          }
        </p>
      </div>
      <div style={[DeveloperStyles.articles]}>
        <h3>Articles:</h3>
        <p>
          {
            props.articles.map(_article => link(_article))
          }
        </p>
      </div>
    </InstanceDetails>
  );
}

Developer.propTypes = {
  about: PropTypes.string,
  articles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
  developer: PropTypes.string.isRequired,
  games: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
  loc: PropTypes.string,
  logoURL: PropTypes.string,
  twitter: PropTypes.object, //eslint-disable-line
  year: PropTypes.number,
};

Developer.defaultProps = {
  about: '',
  articles: [],
  games: [],
  loc: '',
  logoURL: null,
  // if the year isn't defined then it defaults to this year
  year: new Date().getFullYear(),
};

export default Radium(Developer);
