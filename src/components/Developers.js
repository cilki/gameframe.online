/**
 * Developers page with a grid layout of cards.
 */
 
import React from 'react';
import {Image, Badge, Label} from 'react-bootstrap';

class Developers extends React.Component {

  render() {

    /* Produce a "card" containing a developer's logo image and a caption indicating
     * the developer's name and founding year. */
    function renderDeveloperCard (logoURL, developer, year) {
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
            }} width="100%" src={logoURL} />
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

          {renderDeveloperCard("https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/w6kusdugzlssi3yqcbwl.jpg", "Valve Software", "2011") }
          {renderDeveloperCard("https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/lvoic2oakbklg2dytgpa.jpg", "PUBG Corp", "2017") }
          {renderDeveloperCard("https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/taf1unbzsejvvjiicaqk.jpg", "Endnight Games Ltd", "2014") }
          {renderDeveloperCard("https:\/\/images.igdb.com\/igdb\/image\/upload\/t_cover_big\/edkpgyqgfsxyiby9pyj5.jpg", "Psyonix", "2015") }
        </div>
      </div>
    );
  }
}

export default Developers;
