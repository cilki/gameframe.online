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
    const splashImages = [
      {
        href: "/games/36374",
        alt: "PLAYERUNKNOWN'S BATTLEGROUNDS",
        src: "../../../static/images/splash/splash-1.jpg"
      },
      {
        href: "/games/8241",
        alt: "Sid Meier's Civilization VI",
        src: "../../../static/images/splash/splash-2.jpg"
      },
      {
        href: "/games/46054",
        alt: "Dota 2",
        src: "../../../static/images/splash/splash-3.jpg"
      },
      {
        href: "/games/6228",
        alt: "Tom Clancy's Rainbow Six Siege",
        src: "../../../static/images/splash/splash-4.jpg"
      },
      {
        href: "/games/26302",
        alt: "Far Cry 5",
        src: "../../../static/images/splash/splash-5.jpg"
      },
      {
        href: "/games/24501",
        alt: "Portal 2",
        src: "../../../static/images/splash/splash-6.jpg"
      },
      {
        href: "/games/1153",
        alt: "Rocket League",
        src: "../../../static/images/splash/splash-7.jpg"
      },
      {
        href: "/games/42245",
        alt: "Dark Souls III",
        src: "../../../static/images/splash/splash-8.jpg"
      },
      {
        href: "/games/10051",
        alt: "Terraria",
        src: "../../../static/images/splash/splash-9.jpg"
      }
    ]
    
    function createImage(href, alt, src) {
      return (
        <Carousel.Item key={`${alt}-splash`}>
          <a href={href} target="_blank">
            <img 
              style={{
                margin: 'auto',
                width: '100%',
                height: '100%'
              }}
              alt={alt}
              src={src}
            />
          </a>
        </Carousel.Item>
      );
    }
    
    return (
      <div style={{minHeight: '100%'}}>
        <div
          style={[
            CommonAssets.fillBackground,
            CommonAssets.horizontalGradient
          ]}
        />
        <div
          style={[
            CommonAssets.stripeOverlay,
            CommonAssets.fillBackground
          ]}
        />
        <Carousel
          style={{
            padding: '0 0 0 0',
            boxSizing: 'border-box',
            minHeight: '100%'
          }}
        >
          {
            splashImages.map((splashImage, index) => createImage(
              splashImage.href,
              splashImage.alt,
              splashImage.src
            ))
          }
        </Carousel>
      </div>
    );
  }
}

export default Radium(SplashPage);
