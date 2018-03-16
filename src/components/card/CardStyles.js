

const Card = {
  main: {
    padding: '10px 10px 10px 10px',
    width: '256px',
  },

  card: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '10px',
    backgroundColor: 'darkgray',
    transition: 'transform 0.2s, filter 0.1s',
    transform: 'scale(1.0)',
    ':hover': {
      transition: 'transform 0.2s, filter 0.5s',
      transform: 'scale(0.98)',
      filter: 'hue-rotate(360deg)',
    },

    clicked: {
      filter: 'brightness(0.5) hue-rotate(360deg)',
    },
  },

  tooltip: {
    display: 'flex',
    position: 'fixed',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    padding: '0px 5% 0px 5%',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    transition: 'opacity 0.25s ease-out',
    opacity: '0.0',
    ':hover': {
      zIndex: '100',
      height: '100%',
      opacity: '1.0',
      color: 'white',
      transition: 'opacity 0.125s ease-in',
      textShadow: '0px 0px 2px gray, 0px 0px 3px black',
    },
  },
  imageContainerContainer: {
    backgroundColor: 'darkGray',
    height: '256px',
    ':hover': {
      backgroundColor: 'darkGray',
    },
  },

  imageContainer: {
    overflow: 'hidden',
    borderRadius: '10px',
    transition: 'transform 0.2s',
    transform: 'scale(0.995)',
    objectFit: 'fill',
    margin: 'auto',
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '100%',
    objectFit: 'fill',
    ':hover': {
      transform: 'scale(1.0)',
      backgroundColor: 'darkgray',
    },
  },

  image: {
    maxWidth: '100%',
    borderRadius: '10px',
    transition: 'transform 0.2s, filter 0.2s',
    transform: 'scale(1.0)',
    margin: 'auto',
    verticalAlign: 'middle',
    ':hover': {
      transition: 'transform 1.0s, filter 1.0s',
      transform: 'scale(1.05)',
    },
  },


  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '2% 5% 2% 0%',
    transition: 'height 0.2s',
    ':hover': {
      height: '0px',
      overflow: 'hidden',
    },
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
