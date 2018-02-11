var instanceData = require('../../static/data/games/Portal 2.json');

import React from 'react';
import {
  Image,
  Badge,
  Label,
} from 'react-bootstrap';

class InstanceCard extends React.Component {
  constructor(props) {
    super(props);
    this.mouseEntry = this.mouseEntry.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.state = {
      cover: null,
      title: null,
      company: null,
      year: null,
      hover: false
    };
  }

    mouseEntry() {
      console.log("Hello, ");
      this.setState({hover: true});
      console.log(this.state.hover);
    }

    mouseLeave() {
      console.log("and goodbye.");
      this.setState({hover: false});
      console.log(this.state.hover);
    }

  render() {
    /* Produce a 'card' containing a game's cover image and a caption indicating
     * the developer and publication year. */
    function renderGameCard (coverURL, developer, year, hover) {
      console.log(hover);
      return(
        <div style={{
            overflow: 'hidden',
            borderRadius: '10px',
            backgroundColor: 'darkgray',
            /* For the two ternary statements, the first one applies when the
             * mouse cursor is over the card, and the second applies when the
             * mouse moves off of the card. */
            transition: (hover ? 'transform 0.2s' : 'transform 0.2s'),
            transform: (hover ? 'scale(0.98)' : 'scale(1.0)')
        }}>
          <div style={{
            overflow: 'hidden'
          }}>
            <img style={{
              maxWidth: "100%",
              opacity: (hover ? '1.0' : '1.0'),
              /* For the two ternary statements, the first one applies when the
               * mouse cursor is over the image, and the second applies when
               * the mouse moves off of the image. */
              transition: (hover ? 'transform 1.0s' : 'transform 0.2s'),
              transform: (hover ? 'scale(1.05)' : 'scale(1.0)')
            }} src={coverURL} />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: "2% 5% 2% 0%"
          }}>
            <div style={{
              width: '65%',
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
      );
    }

    return (
      <div onMouseEnter={this.mouseEntry} onMouseLeave={this.mouseLeave} style={{
        padding: '10px 10px 10px 10px',
        /* The below maxWidth property controls how small the card is allowed
         * to shrink. */
        maxWidth: '40%'
      }}>
        {renderGameCard(this.props.cover, this.props.company, this.props.year, this.state.hover)}
      </div>
    )
  }
}

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
          <InstanceCard cover="https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/w6kusdugzlssi3yqcbwl.jpg" company="Valve Software"  year="2011" />
          <InstanceCard cover="https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/lvoic2oakbklg2dytgpa.jpg" company="PUBG Corp" year="2017" />
          <InstanceCard cover="https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/taf1unbzsejvvjiicaqk.jpg" company="Endnight Games Ltd" year="2014" />
          <InstanceCard cover="https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/edkpgyqgfsxyiby9pyj5.jpg" company="Psyonix" year="2015" />
        </div>
      </div>
    );
  }
}

export default InstanceGrid;
