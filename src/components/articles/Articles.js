/**
 * Articles page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import CommonAssets from '../../inline-styles/CommonAssets';
import Styles from './ArticlesStyles';
import Card from '../card';

class Articles extends React.Component {
  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
      article_id: PropTypes.number.isRequired,
      article_link: PropTypes.string,
      author: PropTypes.string,
      cover: PropTypes.string,
      developers: PropTypes.arrayOf(PropTypes.number),
      games: PropTypes.arrayOf(PropTypes.number),
      timestamp: PropTypes.string,
      title: PropTypes.string.isRequired,
    })),
    articlesError: PropTypes.string, //eslint-disable-line
    articlesRequested: PropTypes.bool, //eslint-disable-line
    fetchArticles: PropTypes.func.isRequired,
  };

  static defaultProps = {
    articles: [],
    articlesError: null,
    articlesRequested: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description - React lifecycle method used to fetch the data
   */
  componentDidMount() {
    this.props.fetchArticles();
  }

  render() {
    return (
      <div>
        <div style={[
          CommonAssets.fillBackground,
          CommonAssets.horizontalGradient,
        ]}
        />
        <div style={[
          CommonAssets.stripeOverlay,
          CommonAssets.fillBackground,
        ]}
        />
        <div style={[Styles.grid]}>
          {
            this.props.articles.map((article) => {
              return (
                <Card
                  key={article.article_id}
                  title={article.title}
                  url={`/articles/${article.article_id}`}
                  cover={article.cover}
                  origin={article.author}
                  year={new Date(article.timestamp).getFullYear()}
                  tooltipType={3}
                  games={article.games}
                  developers={article.developers}
                  link1={article.article_link}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Radium(Articles);
