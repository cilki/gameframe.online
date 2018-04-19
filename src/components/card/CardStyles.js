/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * CardStyles.js                                                             *
 * This file contains CSS style properties intended for use with elements in *
 * the Card.js file. Below are some parameters that may be used to quickly   *
 * change the general appearance of the cards.                               *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const cornerRadius = '6px';
const cardWidth = '256px';
const cardHeight = '256px';
const cardBorderColor = '#dddddd';

const Card = {
  main: aspectRatio => ({
    transform: 'translate3d(0, 0, 0)',
    padding: '10px',
    margin: 'auto',
    flexBasis: `calc(20vw * ${aspectRatio})`,
    minWidth: '10vw',
    maxWidth: `calc(${cardWidth} * ${aspectRatio}`,
    margin: '0',
    '@media screen and (max-width: 599px)': {
      maxWidth: '45vw',
      minWidth: { cardWidth },
      flexBasis: { cardWidth },
      margin: 'auto',
    },
  }),

  titleText: {
    color: '#e9e9e9',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  card: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: `${cornerRadius}`,
    backgroundColor: `${cardBorderColor}`,
    transform: 'translate3d(0, 0, 0)',
    transition: 'transform 0.2s, filter 0.3s ease',
    ':hover': {
      transform: 'scale(0.98)',
      transition: 'transform 0.2s, filter 0.5s ease',
      //      filter: 'hue-rotate(360deg)',
    },
  },

  imageContainerContainer: aspectRatio => ({
    maxHeight: `${cardHeight}`,
    height: '20vw',
    ':hover': {
      transform: 'scale(0.98)',
      transition: 'transform 0.2s, filter 10.5s ease',
      filter: 'hue-rotate(360deg)',
    },
    '@media screen and (max-width: 599px)': {
      height: `calc(${cardHeight} / ${aspectRatio})`,
      maxHeight: `calc(${cardHeight} / ${aspectRatio})`,
      height: `calc(45vw / ${aspectRatio})`,
    },
  }),

  imageContainer: () => ({
    overflow: 'hidden',
    borderRadius: `${cornerRadius}`,
    transform: 'translate3d(0, 0, 0) scale(0.995)',
    transition: 'transform 0.2s',
    margin: 'auto',
    display: 'flex',
    verticalAlign: 'middle',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
    // ':hover': {
    //  transform: 'scale(1.0)',
    // },
  }),

  backgroundImageContainer: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    borderRadius: `${cornerRadius}`,
  },

  backgroundImage: {
    willChange: 'transform',
    backgroundColor: 'white',
    width: '10%',
    height: '10%',
    position: 'absolute',
    top: '0',
    left: '0',
    imageRendering: 'pixelated',
    filter: 'blur(2px)',
    margin: 'auto',
    transform: 'perspective(800px) translate3d(33%, 33%, 790px)',
    zIndex: '-5',
  },

  image: {
    maxWidth: '100%',
    borderRadius: '0px',
    transform: 'translate3d(0, 0, 0)',
    // transition: 'transform 0.2s, filter 0.2s',
    margin: 'auto',
    verticalAlign: 'middle',
    objectFit: 'fill',
    zIndex: '2',
    // ':hover': {
    //  transition: 'transform 1.0s, filter 1.0s',
    //  transform: 'scale(1.05)',
    // },
  },

  fields: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
    top: '0',
    display: 'flex',
    opacity: '0',
    backgroundColor: 'black',
    justifyContent: 'center',
    transform: 'translate3d(0, 0, 0)',
    ':hover': {
      zIndex: '100',
      opacity: '1.0',
      // color: 'white',
      transition: 'opacity 0.125s ease-in',
      // textShadow: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, -1px 0 0 black, 1px 0 0 black, 0 1px 0 black, 0 -1px 0 black, 0 0 2px black',
    },
  },

  fieldsBackgroundImage: {
    width: '10%',
    height: '10%',
    imageRendering: 'pixelated',
    filter: 'saturate(1.15) blur(2px)',
    display: 'inline-block',
    position: 'absolute',
    margin: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate3d(0, 0, 0) scale3d(50, 50, 1)',
    zIndex: '-5',
    // height: '0',
    // ':hover': {
    //    height: 'revert',
    // }
  },

  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '2% 5% 2% 0%',
    transition: 'height 0.2s',
    zIndex: '1',
  },

  caption: {
    maxWidth: '65%',
    postion: 'relative',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  badgeContainer: {
    maxWidth: '35%',
  },
};

export default Card;
