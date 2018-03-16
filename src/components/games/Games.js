/**
 * Games page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import CommonAssets from '../../inline-styles/CommonAssets';
import Styles from './GamesStyles';

import Card from '../card';

class Games extends React.Component {
  static propTypes = {
    games: PropTypes.arrayOf(PropTypes.shape({
      cover: PropTypes.string,
      developers: PropTypes.arrayOf(PropTypes.shape({
        developer_id: PropTypes.number.isRequired,
      })),
      game_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      release: PropTypes.string,
    })),
    gamesError: PropTypes.string, //eslint-disable-line
    gamesRequested: PropTypes.bool, //eslint-disable-line

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
    this.props.fetchGames();
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
            this.props.games.map((game) => {
              return (
                <Card
                  tooltipType={1}
                  key={game.game_id}
                  title={game.name}
                  url={`/games/${game.game_id}`}
                  cover={game.cover}
                  origin={game.developer}
                  year={new Date(game.release).getFullYear()}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Radium(Games);
