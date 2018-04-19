/**
 * Developers page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { GenericGrid } from '../generic-grid';
import Card from '../card';
import Fields from '../fields';
import { Helmet } from 'react-helmet';

class Developers extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    models: PropTypes.arrayOf(PropTypes.shape({
      article_count: PropTypes.number,
      country: PropTypes.string,
      developer_id: PropTypes.number.isRequired,
      foundation: PropTypes.string,
      game_count: PropTypes.number,
      igdb_id: PropTypes.number,
      logo: PropTypes.string,
      name: PropTypes.string.isRequired,
      tweet_count: PropTypes.number,
      twitter: PropTypes.string,
      website: PropTypes.string,
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
        prefix="developers"
        {...rest}
      >
        <Helmet>
          <title>Developers - GameFrame.online</title>
        </Helmet>
        {
          models.map((developer) => {
            return (
              <Card
                key={developer.developer_id}
                title={developer.name}
                url={`/developers/${developer.developer_id}`}
                cover={developer.logo}
                country={developer.country}
                year={new Date(developer.foundation).getFullYear()}
                aspectRatio={19 / 18}
                fields={
                  <Fields
                    key={developer.developer_id}
                    factor={1.5}
                    games={developer.game_count}
                    articles={developer.article_count}
                    tweets={developer.tweet_count}
                    twitter={developer.twitter}
                    website={developer.website}
                  />
                }
              />
            );
          })
        }
        {
          models.length == 0 ? (
            <div style={{
              color: '#dfdfdf',
              textShadow: '0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1), 0px 18px 23px rgba(0, 0, 0, 0.1)',
            }}
            >
              <h3>There are no results to display...</h3>
            </div>
          ) : ''
        }
      </GenericGrid>
    );
  }
}

export default Developers;
