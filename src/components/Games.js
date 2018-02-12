/**
 * Games page with a grid layout of cards.
 */

//var instanceData = require('../../static/data/games/Portal 2.json');

import React from 'react';
import Card from './Card';

class Games extends React.Component {

  render() {

    // /* START my attempt to extract info from JSON files. Currently the response
    //  * text on line 33 corresponds to the content of the JSON file, but the data
    //  * variable is undefined everywhere else for some reason. */
    //   var data = null;
    //   function readJSON(jsonFile) {
    //     var jsonObject = new XMLHttpRequest();
    //     jsonObject.overrideMimeType("application/json");
    //     jsonObject.open('GET', '../../static/data/games/Portal 2.json', true);
    //     jsonObject.onreadystatechange = function () {
    //     if (jsonObject.readyState == 4 && jsonObject.status == "200") {
    //       this.data = jsonObject.responseText;
    //       /*console.log(this.data);*/
    //       return "http:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/620\/header.jpg?t=1512411524"
    //     }
    //   }
    //   jsonObject.send(null);
    // }

    // function checkVariable() {
    //   if(data != null) {
    //     console.log(data);
    //   }
    // }

    // setTimeout(checkVariable, 1000);
    // readJSON(instanceData);

    // function extractGameHeader(jsonFile) {
    //   return jsonFile["620"]["data"]["header_image"]
    // }
    /* END attempt to extract info from JSON files. */

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
