/**
 * Developers page with a grid layout of cards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Card from '../Card';

class Developers extends React.Component {
  static propTypes = {
	  
  };
  
  static defaultProps = {
	  
  };
  
  constructor(props) {
    super(props);
	this.state = {}
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
          <Card
            url="/ValveCorporation"
            cover="https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png"
            company="Valve Corporation"
            year="1996"
            title="Valve Corporation"
            companyURL="/ValveCorporation"
            gameURL="/Portal2"
            game="Portal 2"
          />
          <Card
            url="/PUBGCorp"
            cover="https://images.igdb.com/igdb/image/upload/t_logo_med/j6prddiusdbjqdktjzgu.png"
            company="PUBG Corp"
            year="2017"
            title="PUBG Corp"
            companyURL="/PUBGCorp"
            gameURL="/PLAYERUNKOWNSBATTLEGROUNDS"
            game="PLAYERUNKOWNS BATTLEGROUNDS"
          />
          <Card
            url="/EndnightGamesLtd"
            cover="https://static.giantbomb.com/uploads/square_small/2/23546/2569979-screen+shot+2013-11-12+at+5.49.55+pm.png"
            company="Endnight Games Ltd"
            year="2014"
            title="Endnight Games Ltd"
            companyURL="/EndnightGamesLtd"
            gameURL="/TheForest"
            game="The Forest"
          />
          <Card
            url="/Psyonix"
            cover="https://images.igdb.com/igdb/image/upload/t_logo_med/iosg1iatkemmtzdlu3zf.png"
            company="Psyonix"
            year="2000"
            title="Psyonix"
            companyURL="/Psyonix"
            gameURL="/RocketLeague"
            game="Rocket League"
          />
        </div>
      </div>
    );
  }
}

export default Developers;
