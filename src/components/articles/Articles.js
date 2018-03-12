/**
 * Articles page with a grid layout of cards.
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import Radium from 'radium';
// import TextCard from '../TextCard';

class Articles extends React.Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description - React lifecycle method used to fetch the data
   */
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          position: 'relative',
          justifyContent: 'space-around',
          maxWidth: '100%',
        }}
        >
          {/* Dynamic content for Articles goes here! */}
        </div>
      </div>
    );
  }
}

export default Articles;
