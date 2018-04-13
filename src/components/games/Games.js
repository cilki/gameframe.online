/**
 * Games page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { GenericGrid } from '../generic-grid';
import Card from '../card';
import Fields from '../fields';

class Games extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    models: PropTypes.arrayOf(PropTypes.shape({
      article_count: PropTypes.number,
      cover: PropTypes.string,
      developer: PropTypes.string,
      developer_count: PropTypes.number,
      esrb: PropTypes.number,
      game_id: PropTypes.number.isRequired,
      genres: PropTypes.arrayOf(PropTypes.shape({
        genre_id: PropTypes.number,
        name: PropTypes.string,
      })),
      igdb_id: PropTypes.number,
      igdb_link: PropTypes.string,
      metacritic: PropTypes.number,
      name: PropTypes.string.isRequired,
      platforms: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        platform_id: PropTypes.number,
      })),
      price: PropTypes.number,
      release: PropTypes.string,
      steam_id: PropTypes.number,
      steam_players: PropTypes.number,
      tweet_count: PropTypes.number,
      video_count: PropTypes.number,
      vindex: PropTypes.number,
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
        prefix="games"
        {...rest}
      >
        {
          models.map((game) => {
            return (
              <Card
                key={game.game_id}
                title={game.name}
                url={`/games/${game.game_id}`}
                cover={game.cover}
                developer={game.developer}
                year={new Date(game.release).getFullYear()}
                aspectRatio={1.0}
                fields={
                  <Fields
                    price={game.price}
                    articles={game.article_count}
                    genres={game.genres}
                    platforms={game.platforms}
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

export default Games;
