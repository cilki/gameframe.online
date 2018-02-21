/**
 * Developers page with a grid layout of cards.
 */

import React from 'react';
import Card from './Card';

class Developers extends React.Component {
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
            title="Developer"
            companyURL="/ValveCorporation"
            gameURL="/Portal2"
            game="Portal 2"
          />
          <Card
            url="/PUBGCorp"
            cover="https://images.igdb.com/igdb/image/upload/t_logo_med/j6prddiusdbjqdktjzgu.png"
            company="PUBG Corp"
            year="2017"
            title="Developer"
            companyURL="/PUBGCorp"
            gameURL="/PLAYERUNKOWNSBATTLEGROUNDS"
            game="PLAYERUNKOWNS BATTLEGROUNDS"
          />
          <Card
            url="/EndnightGamesLtd"
            cover="https://static.giantbomb.com/uploads/square_small/2/23546/2569979-screen+shot+2013-11-12+at+5.49.55+pm.png"
            company="Endnight Games Ltd"
            year="2014"
            title="Developer"
            companyURL="/EndnightGamesLtd"
            gameURL="/TheForest"
            game="The Forest"
          />
          <Card
            url="/Psyonix"
            cover="https://images.igdb.com/igdb/image/upload/t_logo_med/iosg1iatkemmtzdlu3zf.png"
            company="Psyonix"
            year="2000"
            title="Developer"
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
