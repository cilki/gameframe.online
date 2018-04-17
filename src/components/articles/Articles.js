/**
 * Articles page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { GenericGrid } from '../generic-grid';
import Card from '../card';
import Fields from '../fields';

class Articles extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    models: PropTypes.arrayOf(PropTypes.shape({
      article_id: PropTypes.number.isRequired,
      article_link: PropTypes.string,
      author: PropTypes.string,
      cover: PropTypes.string,
      developer_count: PropTypes.number,
      game_count: PropTypes.number,
      outlet: PropTypes.outlet,
      timestamp: PropTypes.string,
      title: PropTypes.string.isRequired,
    })),
    error: PropTypes.string, //eslint-disable-line
    requested: PropTypes.bool, //eslint-disable-line
    totalPages: PropTypes.number.isRequired,
  };

  static defaultProps = {
    models: [],
    error: null,
    requested: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { models, ...rest } = this.props;
    return (
      <GenericGrid
        prefix="articles"
        {...rest}
      >
        {
          models.map((article) => {
            return (
              <Card
                key={article.article_id}
                title={article.title}
                url={`/articles/${article.article_id}`}
                cover={article.cover}
                author={article.author}
                year={new Date(article.timestamp).getFullYear()}
                aspectRatio={16/9}
                fields={
                  <Fields
                    key={article.article_id}
                    factor={1.5}
                    games={article.game_count}
                    developers={article.developer_count}
                    source={article.article_link}
                  />
                }
              />
            );
          })
        }
      </GenericGrid>
    );
  }
}

export default Articles;

