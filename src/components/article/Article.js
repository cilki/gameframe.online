/**
 * Article is a generic page template for Articles.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ArticleStyles from './ArticleStyles';
import InstanceDetails from '../InstanceDetails';

import CommonAssets from '../../inline-styles/CommonAssets';

/**
 * @description - Helper method for rendering a link to a game or developer
 * @param {Object} props
 * @param {Object} props.label
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
  key: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
};

/**
 * @description - Returns the main component to render a article's own
 * page
 * @param {Object} props
 * @returns {React.Component}
 */
class Article extends React.Component {
  static propTypes = {
    // article_id: PropTypes.number.isRequired,
    author: PropTypes.string,
    developers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    games: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    cover: PropTypes.string,
    introduction: PropTypes.string,
    // outlet: PropTypes.string,
    timestamp: PropTypes.string,
    title: PropTypes.string,

    fetchArticle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    author: '',
    cover: null,
    developers: [],
    games: [],
    introduction: '',
    // outlet: '',
    timestamp: '',
    title: '',
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchArticle();
  }

  render() {
    return (
      <div>
        <div
          style={[
            CommonAssets.stripeOverlay,
            CommonAssets.fillBackground,
          ]}
        />
        <InstanceDetails
          style={{
            container: ArticleStyles.container(this.props.cover),
            border: ArticleStyles.border,
            jumboTron: ArticleStyles.jumboTron,
          }}
        >
          <div>
            <h1 style={[ArticleStyles.title]}>{this.props.title}</h1>
            <div style={[ArticleStyles.secondaryInfo]}>
              <p>Author: {this.props.author}</p>
              <p>Published: {this.props.timestamp}</p>
            </div>

            <div style={[ArticleStyles.summary]}>
              {/* TODO: We can do better than this. There are existing libraries to put in HTML */}
              <p dangerouslySetInnerHTML={{ __html: this.props.introduction }} /> {/* eslint-disable-line */}
              <h3>Published by {this.props.author}</h3>
            </div>
            <div style={[ArticleStyles.developer]}>
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
            <div style={[ArticleStyles.game]}>
              <p>Game:
                {
                  this.props.games.map(game => link({
                    label: game.name,
                    url: `/games/${game.id}`,
                    key: `game-${game.id}`,
                  }))
                }
              </p>
            </div>
          </div>
        </InstanceDetails>
      </div>
    );
  }
}

export default Radium(Article);
