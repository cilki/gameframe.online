/**
 * Developers page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import Grid from '../grid';
import CommonAssets from '../../inline-styles/CommonAssets';
import Card from '../card';

class Developers extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    developers: PropTypes.arrayOf(PropTypes.shape({
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
    developersError: PropTypes.string, //eslint-disable-line
    developersRequested: PropTypes.bool, //eslint-disable-line
    totalPages: PropTypes.number.isRequired,

    fetchDevelopers: PropTypes.func.isRequired,
  };

  static defaultProps = {
    developers: [],
    developersError: null,
    developersRequested: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description - React lifecycle method used to fetch the data
   */
  componentDidMount() {
    this.props.fetchDevelopers(this.props.currentPage);
  }

  /**
   * @description - React lifecycle method that detects when a different
   * page has been requested
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.props.fetchDevelopers(this.props.currentPage);
    }
  }

  render() {
    return (
      <div>
        <div
          style={[
            CommonAssets.fillBackground,
            CommonAssets.horizontalGradient,
          ]}
        />
        <div
          style={[
            CommonAssets.stripeOverlay,
            CommonAssets.fillBackground,
          ]}
        />
        <Grid
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          prefix="developers"
        >
          {
            this.props.developers.map((developer) => {
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
        </Grid>
      </div>
    );
  }
}

export default Radium(Developers);
