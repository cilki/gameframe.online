const cornerRadius = '4px';


const Minigrid = {
  main: {
    maxHeight: '70vh',
    overflowY: 'scroll',
    borderRadius: `${cornerRadius}`,
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'row wrap',
  },

  minigridLink: {
    textDecoration: 'none',
    borderRadius: `${cornerRadius}`,
    width: 'calc((100vh + 20vw) / 4)',
    height: 'calc((20vh + 20vw) / 2)',
    margin: 'calc((1vw + 1vh) / 2)',
    flex: 'auto',
  },

  minicard: cover => ({
    width: '100%',
    height: '100%',
    borderRadius: `${cornerRadius}`,
    backgroundImage: `url(${cover})`,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'all 0.2s',
    ':hover': {
      filter: 'brightness(150%)',
      boxShadow: '0 14px 20px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    },
  }),

  minicardTextArea: {
    padding: '2%',
    background: 'rgba(16, 16, 16, 0.9)',
    color: '#eeeeee',
    borderRadius: `${cornerRadius}`,
  },

  minicardParagraph: {
    fontSize: 'calc(12px + 0.5vw)',
  },

};

export default Minigrid;
