var instanceData = require('../../static/data/games/Portal 2.json');

import React from 'react';
import {
  Image,
  Badge,
  Label,
} from 'react-bootstrap';

class InstanceGrid extends React.Component {

  render() {

    /* START my attempt to extract info from JSON files. Currently the response
     * text on line 33 corresponds to the content of the JSON file, but the data
     * variable is undefined everywhere else for some reason. */
      var data = null;
      function readJSON(jsonFile) {
        var jsonObject = new XMLHttpRequest();
        jsonObject.overrideMimeType("application/json");
        jsonObject.open('GET', '../../static/data/games/Portal 2.json', true);
        jsonObject.onreadystatechange = function () {
        if (jsonObject.readyState == 4 && jsonObject.status == "200") {
          this.data = jsonObject.responseText;
          /*console.log(this.data);*/
          return "http:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/620\/header.jpg?t=1512411524"
        }
      }
      jsonObject.send(null);
    }

    function checkVariable() {
      if(data != null) {
        console.log(data);
      }
    }

    setTimeout(checkVariable, 1000);
    readJSON(instanceData);
    console.log(this.data);

    function extractGameHeader(jsonFile) {
      return jsonFile["620"]["data"]["header_image"]
    }
    /* END attempt to extract info from JSON files. */

    /* Produce a 'card' containing a game's cover image and a caption indicating
     * the developer and publication year. */
    function renderGameCard (coverURL, developer, year) {
      return(
        <div  style={{
          padding: "10px 10px 10px 10px",
          display: 'block',
          maxWidth: '40%'
        }}>
          <div style={{
            maxWidth: "100%",
          }}>
            <img style={{
              borderRadius: "10px",
              maxWidth: "100%",
              maxHeight: "100%"
            }} width="100%" src={coverURL} />
          </div>
          <div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: "0px 10px 0px 0px"
            }}>
              <div style={{
                width: '75%',
                postion: 'relative',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                <Label>
                  {developer}
                </Label>
              </div>
              <div style={{
                width: '15%',
              }}>
                <Badge>
                  {year}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      );
    }



    return (
      <div>
        <div  style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          position: 'relative',
          justifyContent: 'space-around',
        }}>

          {renderGameCard("https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/w6kusdugzlssi3yqcbwl.jpg", "Valve Software", "2011") }
          {renderGameCard("https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/lvoic2oakbklg2dytgpa.jpg", "PUBG Corp", "2017") }
          {renderGameCard("https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/taf1unbzsejvvjiicaqk.jpg", "Endnight Games Ltd", "2014") }
          {renderGameCard("https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/edkpgyqgfsxyiby9pyj5.jpg", "Psyonix", "2015") }
        </div>
      </div>
    );
  }
}

export default InstanceGrid;
