/**
 * Articles page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import TextCard from '../TextCard';

class Articles extends React.Component {
  static propTypes = {
	  
  };
  
  static defaultProps = {
	  
  };
  
  constructor(props) {
    super(props);
	this.statie = {}
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
          <TextCard url="/Article1" cover="" company="Brendan Caldwell" year="January 10, 2018" title="Bridge Constructor Portal isnt a rollercoaster of laughs, but its still good" companyURL="/AlexNavarro" />
          <TextCard url="/Article2" cover="" company="Giant Bomb Staff" year="Giant Bomb Staff" title="Will Smiths Top 7 Games of 2017" companyURL="/GiantBombStaff" />
          <TextCard url="/Article3" cover="" company="Dominic Tarason" year="February 2, 2018" title="The Forest launches this April, after four years lost in the woods" companyURL="DISHMINK" />
          <TextCard url="/Article4" cover="https://i.imgur.com/bR8e9SE.jpg" company="Corey Davis" year="January 31, 2018" title="Rocket League Roadmap: Spring 2018" companyURL="/DIRKENED" />
        </div>
      </div>
    );
  }
}

export default Articles;
