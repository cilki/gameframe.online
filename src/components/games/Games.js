/**
 * Games page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import CommonAssets from '../../inline-styles/CommonAssets';
import Card from '../card';
import Grid from '../grid';

class Games extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    games: PropTypes.arrayOf(PropTypes.shape({
      articles: PropTypes.arrayOf(PropTypes.number),
      cover: PropTypes.string,
      developers: PropTypes.arrayOf(PropTypes.number),
      game_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      release: PropTypes.string,
    })),
    gamesError: PropTypes.string, //eslint-disable-line
    gamesRequested: PropTypes.bool, //eslint-disable-line
    totalPages: PropTypes.number.isRequired,

    fetchGames: PropTypes.func.isRequired,
  };

  static defaultProps = {
    games: [],
    gamesError: null,
    gamesRequested: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description - React lifecycle method used to fetch the data
   */
  componentDidMount() {
    this.props.fetchGames(this.props.currentPage);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPage !== prevProps.currentPage) {
      this.props.fetchGames(this.props.currentPage);
    }
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
        <Grid
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          prefix="games"
        >
          {
            this.props.games.map((game) => {
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
        </Grid>
      </div>
    );
  }
}

export default Radium(Games);
