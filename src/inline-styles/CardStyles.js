

const Card = {
  main: {
    padding: '10px 10px 10px 10px',
    maxWidth: '40%'
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
      filter: 'hue-rotate(360deg)'
    },

    clicked: {
      filter: 'brightness(0.5) hue-rotate(360deg)'
    }
  },

  imageContainer: {
    overflow: 'hidden',
    borderRadius: '10px',
    transition: 'transform 0.2s',
    transform: 'scale(0.995)',
    backgroundColor: 'gray',
    margin: 'auto',
    hover: {
      transform: 'scale(1.0)',
      backgroundColor: 'darkgray'
    }
  },

  image: {
    maxWidth: '100%',
    borderRadius: '10px',
    transition: 'transform 0.2s, filter 0.2s',
    transform: 'scale(1.0)',
    hover: {
      transition: 'transform 1.0s, filter 0.2s',
      transform: 'scale(1.05)'
    }
  },


  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: "2% 5% 2% 0%"
  },

  caption: {
    width: '65%',
    postion: 'relative',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  badgeContainer: {
    width: '15%'
  }
};

export { Card };
