

const TextCard = {
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
    background: 'radial-gradient(white, grey)',
    margin: 'auto',
    hover: {
      transform: 'scale(1.0)',
    },
  },

  h2: {
    color: 'black',
    padding: '5% 5% 5% 5%',
    textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa,  0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)'
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
    maxWidth: '65%',
    postion: 'relative',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  badgeContainer: {
    maxWidth: '35%'
  }
};

export { TextCard };
