/**
 * Games page with a grid layout of cards.
 */

import React from 'react';
import Card from './Card';

class Games extends React.Component {

  render() {
    return (
      <div>
        <div  style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          position: 'relative',
          justifyContent: 'space-around',
          maxWidth: '100%'
        }}>
          <Card url='/Portal2' cover='https://images.igdb.com/igdb/image/upload/t_cover_big/w6kusdugzlssi3yqcbwl.jpg' company='Valve Software'  year='2011' title='Portal 2'/>
          <Card url='/PLAYERUNKNOWNSBATTLEGROUNDS' cover='https://images.igdb.com/igdb/image/upload/t_cover_big/lvoic2oakbklg2dytgpa.jpg' company='PUBG Corp' year='2017' title='PLAYERUNKNOWN&#39;S BATTLEGROUNDS' />
          <Card url='/TheForest' cover='https://images.igdb.com/igdb/image/upload/t_cover_big/taf1unbzsejvvjiicaqk.jpg' company='Endnight Games Ltd' year='2014' title='The Forest'/>
          <Card url='/RocketLeague' cover='https://images.igdb.com/igdb/image/upload/t_cover_big/edkpgyqgfsxyiby9pyj5.jpg' company='Psyonix' year='2015' title='Rocket League' />
        </div>
      </div>
    );
  }
}

export default Games;
