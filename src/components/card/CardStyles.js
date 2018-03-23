const cornerRadius = '6px';
const cardWidth = '256px';
const cardHeight = '256px';

const Card = {
  main: {
    padding: '10px',
    width: `${cardWidth}`,
  },

  titleText: {
    color: '#e9e9e9',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  card: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: `${cornerRadius}`,
    backgroundColor: 'darkgray',
    transition: 'transform 0.2s, filter 0.3s ease',
    transform: 'scale(1.0)',
    ':hover': {
      transition: 'transform 0.2s, filter 0.5s ease',
      transform: 'scale(0.98)',
      filter: 'hue-rotate(360deg)',
    },
  },

  imageContainerContainer: {
    backgroundColor: 'darkGray',
    height: `${cardHeight}`,
    ':hover': {
      backgroundColor: 'darkGray',
    },
  },

  imageContainer: () => ({
    overflow: 'hidden',
    borderRadius: `${cornerRadius}`,
    transition: 'transform 0.2s',
    transform: 'scale(0.995)',
    objectFit: 'fill',
    margin: 'auto',
    display: 'flex',
    verticalAlign: 'middle',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
    ':hover': {
      transform: 'scale(1.0)',
      backgroundColor: 'darkgray',
    },
  }),

  backgroundImageContainer: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    borderRadius: `${cornerRadius}`
  },

  backgroundImage: {
    position: 'absolute',
    filter: 'blur(64px)',
    top: '-50%',
    left: '-50%',
    backgroundColor: 'white',
    margin: 'auto',
    width: '200%',
    height: '200%',
    zIndex: '-5',
  },

  image: {
    maxWidth: '100%',
    borderRadius: '0px',
    transition: 'transform 0.2s, filter 0.2s',
    transform: 'scale(1.0)',
    margin: 'auto',
    verticalAlign: 'middle',
    zIndex: '2',
    ':hover': {
      transition: 'transform 1.0s, filter 1.0s',
      transform: 'scale(1.05)',
    },
  },

  tooltip: {
    display: 'flex',
    position: 'fixed',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    top: '0',
    overflowX: 'hidden',
    overflowY: 'scroll',
    left: '0',
    padding: '5% 5% 0px 5%',
    borderRadius: `${cornerRadius}`,
    transition: 'opacity 0.25s ease-out',
    opacity: '0.0',
    ':hover': {
      zIndex: '100',
      height: '100%',
      opacity: '1.0',
      color: 'white',
      transition: 'opacity 0.125s ease-in',
      textShadow: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, -1px 0 0 black, 1px 0 0 black, 0 1px 0 black, 0 -1px 0 black, 0 0 2px black',
    },
  },

  tooltipBackgroundImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-2',
    filter: 'blur(20px) saturate(1.15)',
    transform: 'scale(5.20)'
  },

  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '2% 5% 2% 0%',
    transition: 'height 0.2s',
    zIndex: '1'
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
