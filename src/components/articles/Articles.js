/**
 * Articles page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import CommonAssets from '../../inline-styles/CommonAssets';
import Styles from './ArticlesStyles';
import TextCard from '../TextCard';

// import TextCard from '../TextCard';

class Articles extends React.Component {
  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({

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
                <TextCard 
                  key={article.article_id}
                  company={article.company}
                  title={article.title}
                  url={'articles/${article.article_id}'}
                  year={article.year}
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
