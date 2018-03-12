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
            CommonAssets.stripeOverlay,
            // CommonAssets.backgroundColor,
            CommonAssets.fillBackground,
          ]}
        />
        <Carousel
          style={{
            padding: '0 0 0 0',
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
                src="http://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1516879634"
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
                src="http://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg?t=1512411524"
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
                src="http://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg?t=1512003663"
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
                src="http://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg?t=1478631950"
              />
            </a>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Radium(SplashPage);
