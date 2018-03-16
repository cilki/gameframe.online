/**
 * Articles page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import CommonAssets from '../../inline-styles/CommonAssets';
import Styles from './ArticlesStyles';
import Card from '../card';

// import TextCard from '../TextCard';

class Articles extends React.Component {
  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
	  article_id: PropTypes.number.isRequired,
	  article_link: PropTypes.string,
	  author: PropTypes.string,
      developers: PropTypes.arrayOf(PropTypes.shape({

      })),
	  games: PropTypes.arrayOf(PropTypes.shape({
	    // game_id: PropType.number.isRequired,
	    // name: PropType.string.isRequired,
	  })),
	  // image: PropTypes.string,
	  outlet: PropTypes.string,
	  // timestamp: PropTypes.string,
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
          CommonAssets.stripeOverlay,
          // CommonAssets.backgroundColor,
          CommonAssets.fillBackground,
        ]}
        />
        <div style={[Styles.grid]}>
          {
            this.props.articles.map((article) => {
              return (
                <Card
                  tooltipType={3}
                  key={article.article_id}
                  title={article.title}
                  url={`/articles/${article.article_id}`}
				  /* cover={article.cover} */
                  origin={article.author}
				  /* year={new Date(game.release).getFullYear()} */
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
