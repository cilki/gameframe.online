/**
 * Developers page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import CommonAssets from '../../inline-styles/CommonAssets';
import Styles from './DevelopersStyles';

import Card from '../card';

class Developers extends React.Component {
  static propTypes = {
    developers: PropTypes.arrayOf(PropTypes.shape({
	  developer_id: PropTypes.number.isRequired,
	  logo: PropTypes.string,
	  name: PropTypes.string.isRequired,
	})),
	developersError: PropTypes.string, //eslint-disable-line
	developersRequested: PropTypes.bool, //eslint-disable-line
	
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
    this.props.fetchDevelopers();
  }

  render() {
    return (
      <div>
        <div style={[
          CommonAssets.stripeOverlay,
		  CommonAssets.fillBackground,
        ]}
        />
		<div style={[Styles.grid]}>
		  {
		    this.props.developers.map((developer) => {
			  return (
			    <Card
				  key={developer.developer_id}
				  url={`/developers/${developer.developer_id}`}
				  cover={developer.logo}
				  title={developer.name}
				/>
			  );
			})
		  }
		</div>
      </div>
    );
  }
}

export default Radium(Developers);