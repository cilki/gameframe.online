
/**
 * Developers page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card';
import { GenericGrid } from '../generic-grid';

class Developers extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    models: PropTypes.arrayOf(PropTypes.shape({
      articles: PropTypes.arrayOf(PropTypes.number),
      country: PropTypes.string,
      foundation: PropTypes.number,
      games: PropTypes.arrayOf(PropTypes.number),
      developer_id: PropTypes.number.isRequired,
      logo: PropTypes.string,
      name: PropTypes.string.isRequired,
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
        {
          models.map((developer) => {
            return (
              <Card
                key={developer.developer_id}
                title={developer.name}
                url={`/developers/${developer.developer_id}`}
                cover={developer.logo}
                origin={developer.country ? Number(developer.country) : null}
                year={developer.foundation}
                tooltipType={2}
                articles={developer.articles}
                games={developer.games}
                link1={developer.twitter}
                link2={developer.website}
              />
            );
          })
        }
      </GenericGrid>
    );
  }
}

export default Developers;
