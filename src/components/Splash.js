/**
 * Splash page carousel.
 */

import React from 'react';
import Radium from 'radium';
import { Carousel } from 'react-bootstrap';
import CommonAssets from '../inline-styles/CommonAssets';

class SplashPage extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div
        style={[
          { minHeight: '100%' },
        ]}
      >
        <div
          style={[
            CommonAssets.fillBackground,
            CommonAssets.horizontalGradient,
          ]}
        />
        <div
          style={[
            CommonAssets.stripeOverlay,
            // CommonAssets.backgroundColor,
            CommonAssets.fillBackground,
          ]}
        />
        <Carousel
          style={{
            padding: '0 0 0 0',
            boxSizing: 'border-box',
            minHeight: '100%',
          }}
        >
          <Carousel.Item>
            <a href="/games" target="_blank">
              <img
                style={{
                margin: 'auto',
                width: '100%',
                height: '100%',
              }}
                width={900}
                height={500}
                alt="PLAYERUNKNOWN'S BATTLEGROUNDS"
                src="https://d1wfiv6sf8d64f.cloudfront.net/static/pc/img/visual_main.jpg"
              />
            </a>
          </Carousel.Item>
          <Carousel.Item>
            <a href="/games" target="_blank">
              <img
                style={{
                margin: 'auto',
                width: '100%',
                height: '100%',
              }}
                width={900}
                height={500}
                alt="Portal 2"
                src="http://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/620/aae901f5cca93fb9f50fd4746535d24cd572b5b4.jpg"
              />
            </a>
          </Carousel.Item>
          <Carousel.Item>
            <a href="/games" target="_blank">
              <img
                style={{
                margin: 'auto',
                width: '100%',
                height: '100%',
                }}
                width={900}
                height={500}
                alt="Rocket League"
                src="http://nintendoenthusiast.com/wp-content/uploads/2017/01/rocket-league.jpg"
              />
            </a>
          </Carousel.Item>
          <Carousel.Item>
            <a href="/games" target="_blank">
              <img
                style={{
                margin: 'auto',
                width: '100%',
                height: '100%',
                }}
                width={900}
                height={500}
                alt="The Forest"
                src="https://compunit.pl/wp-content/uploads/2016/05/maxresdefault.jpg"
              />
            </a>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Radium(SplashPage);
