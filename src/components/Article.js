/**
 * Article is a generic page template for Articles.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Jumbotron, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ArticleStyles from '../inline-styles/ArticleStyles';

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

function Article(props) {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundSize: 'cover',
          position: 'fixed',
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          filter: 'blur(64px)',
          zIndex: '-100',
          display: 'block',
          transform: 'scale(1.4)',
        }}
      />
      <div style={[ArticleStyles.border]}>
        <Jumbotron style={[ArticleStyles.jumboTron, { borderRadius: '10px' }]}>
          <h1 style={[ArticleStyles.title]}>{props.title}</h1>
          <div style={[ArticleStyles.secondaryInfo]}>
            <p>Author: {props.author}</p>
            <p>Published: {props.publish}</p>
          </div>
          <div style={[ArticleStyles.imageGallery]}>
            <div
              key={props.title}
              style={[
                ArticleStyles.imageContainer,
              ]}
            >
              <div>
                <a href={props.image || window.location.href}> {/* eslint-disable-line */}
                  <img
                    key={props.image}
                    style={[
                      ArticleStyles.image,
                    ]}
                    alt={`${props.title}`}
                    src={props.image || '../../static/images/noImage.png'}
                  />
                </a>
              </div>
            </div>
          </div>
          <div style={[ArticleStyles.summary]}>
            {/* TODO: We can do better than this. There are existing libraries to put in HTML */}
            <p dangerouslySetInnerHTML={{ __html: props.summary }} /> {/* eslint-disable-line */}
            <h3>Published by {props.publisher}</h3>
          </div>
          <div style={[ArticleStyles.games]}>
            <h3>Games:</h3>
            <p>
              {
                props.games.map(_game => link(_game))
              }
            </p>
          </div>
          <div style={[ArticleStyles.developer]}>
            <p>Developer:
              {
                props.developers.map(_developer => link(_developer))
              }
            </p>
          </div>
        </Jumbotron>
      </div>
    </div>
  );
}

Article.propTypes = {
  author: PropTypes.string,
  // not sure if this should be a list or single item. List is more flexible though
  developers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
  // not sure if this should be a list or single item. List is more flexible though...
  games: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
  image: PropTypes.string,
  publish: PropTypes.number,
  publisher: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Article.defaultProps = {
  author: 'Unknown',
  developers: [],
  games: [],
  image: null,
  publish: new Date().getFullYear(),
};

export default Radium(Article);
