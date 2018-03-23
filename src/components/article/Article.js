/**
 * Article is a generic page template for Articles.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Label, ListGroup, ListGroupItem } from 'react-bootstrap';
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
    <ListGroupItem key={key}>
      <Link to={url} style={{ textDecoration: 'none' }}>
        <Label>{label}</Label>
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
 * @description - Returns the main component to render a article's own
 * page
 * @param {Object} props
 * @returns {React.Component}
 */
class Article extends React.Component {
  static propTypes = {
    article_link: PropTypes.string.isRequired, //eslint-disable-line
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
    outlet: PropTypes.string,
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
    outlet: '',
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
    const coverURL = this.props.cover && this.props.cover.indexOf('http') < 0 ?
      `https://${this.props.cover}` : this.props.cover;
    const outletURL = this.props.outlet && this.props.outlet.indexOf('http') < 0 ?
      `http://${this.props.outlet}` : this.props.outlet;
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
            container: ArticleStyles.container(coverURL),
            border: ArticleStyles.border,
            jumboTron: ArticleStyles.jumboTron,
          }}
        >
          <div>
            <h1 style={[ArticleStyles.title]}>{this.props.title}
              <div style={[ArticleStyles.logo]}>
                <img
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  src={coverURL}
                  alt={`${this.props.author} thumbnail`}
                />
              </div>
            </h1>

            <div style={[ArticleStyles.secondaryInfo]}>
              <p>Author: {this.props.author}</p>
              <p>Published: {this.props.timestamp}</p>
              <p>Outlet: <a href={outletURL}>{outletURL}</a></p>
            </div>

            <div style={[ArticleStyles.summary]}>
              {/* TODO: We can do better than this. There are existing libraries to put in HTML */}
              <p dangerouslySetInnerHTML={{ __html: this.props.introduction }} /> {/* eslint-disable-line */}
            </div>

            <div style={[ArticleStyles.games]}>
              <h3>Developers:</h3>
              {
                this.props.developers.length > 0 &&
                <span>
                  <ListGroup>
                    {
                      this.props.developers.map(developer => link({
                        label: developer.name,
                        url: `/developers/${developer.id}`,
                        key: `developer-${developer.id}`,
                      }))
                    }
                  </ListGroup>
                </span>
              }
            </div>

            <div style={[ArticleStyles.games]}>
              <h3>Games:</h3>
              {
                this.props.games.length > 0 &&
                <span>
                  <ListGroup>
                    {
                      this.props.games.map(game => link({
                        label: game.name,
                        url: `/games/${game.id}`,
                        key: `game-${game.id}`,
                      }))
                    }
                  </ListGroup>
                </span>
              }
            </div>
          </div>
        </InstanceDetails>
      </div>
    );
  }
}

export default Radium(Article);
