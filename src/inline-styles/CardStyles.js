

const Card = {
  main: {
    padding: '10px 10px 10px 10px',
    maxWidth: '40%',
  },

  card: {
    overflow: 'hidden',
    borderRadius: '10px',
    backgroundColor: 'darkgray',
    transition: 'transform 0.2s, filter 0.1s',
    transform: 'scale(1.0)',
    hover: {
      transition: 'transform 0.2s, filter 0.5s',
      transform: 'scale(0.98)',
      filter: 'hue-rotate(360deg)',
    },

    clicked: {
      filter: 'brightness(0.5) hue-rotate(360deg)',
    },
  },

  tooltip: {
    opacity: '0.0',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '0px',
    backgroundColor: 'gray',
    padding: '0px 5% 0px 5%',
    minWidth: '100%',
    maxWidth: '256px',
    transition: 'height 0.255s',
    overflow: 'hidden',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    hover: {
      height: '200px',
      opacity: '1.0',
      color: 'white',
      textShadow: '0px 0px 2px gray, 0px 0px 3px black',
    },
  },
  imageContainerContainer: {
    backgroundColor: 'darkGray',
    hover: {
      backgroundColor: 'gray',
    },
  },

  imageContainer: {
    overflow: 'hidden',
    borderRadius: '10px',
    transition: 'transform 0.2s',
    transform: 'scale(0.995)',
    margin: 'auto',
    hover: {
      transform: 'scale(1.0)',
      backgroundColor: 'darkgray',
    },
  },

  image: {
    maxWidth: '100%',
    borderRadius: '10px',
    transition: 'transform 0.2s, filter 0.2s',
    transform: 'scale(1.0)',
    position: 'relative',
    width: '100%',
    margin: 'auto',
    hover: {
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
    hover: {
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

export { Card };
