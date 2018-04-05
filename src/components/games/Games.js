/**
 * Games page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card';
import { GenericGrid } from '../generic-grid';

class Games extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    models: PropTypes.arrayOf(PropTypes.shape({
      articles: PropTypes.arrayOf(PropTypes.number),
      cover: PropTypes.string,
      developers: PropTypes.arrayOf(PropTypes.number),
      game_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      release: PropTypes.string,
      genres: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        genre_id: PropTypes.number,
      })),
      platforms: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        platform_id: PropTypes.number,
      })),
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
    console.log(models);
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
                developer={game.price ? `\$${game.price / 100}` : null}
                year={new Date(game.release).getFullYear()}

                price={game.price}
                articles={game.articles}
                genres={game.genres}
                platforms={game.platforms}
              />
            );
          })
        }
      </GenericGrid>
    );
  }
}

export default Games;
