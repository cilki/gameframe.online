/**
 * Games page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { GenericGrid } from '../generic-grid';
import Card from '../card';
import Fields from '../fields';
import { Helmet } from 'react-helmet';

/**
 * @description - Obtain Steam url from id.
 * @param {Number} steam_id
 * @return {String}
 */
function steam(steam_id) {
  let steam = null;
  if (steam_id != null) {
    steam = `https://store.steampowered.com/app/${steam_id}/`;
  }
  return steam;
}

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
        <Helmet>
          <title>Games - GameFrame.online</title>
        </Helmet>
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
                    key={game.game_id}
                    price={game.price}
                    players={game.steam_players}
                    vindex={game.vindex}
                    metacritic={game.metacritic}
                    esrb={game.esrb}
                    game={game.name}
                    genres={game.genres}
                    platforms={game.platforms}
                    articles={game.article_count}
                    videos={game.video_count}
                    tweets={game.tweet_count}
                    steam={steam(game.steam_id)}
                    igdb={game.igdb_link}
                    website={game.website}
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

export default Games;
