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
                origin={game.developer}
                year={new Date(game.release).getFullYear()}
                tooltipType={1}
                price={game.price}
                articles={game.articles}
              />
            );
          })
        }
      </GenericGrid>
    );
  }
}

export default Games;
