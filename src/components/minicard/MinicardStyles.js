const cornerRadius = '4px';


const Minicard = {
  link: {
    textDecoration: 'none',
    borderRadius: `${cornerRadius}`,
    width: 'calc((100vh + 20vw) / 8)',
    height: 'calc((20vh + 20vw) / 3)',
    margin: 'calc((1vw + 1vh) / 2)',
    flex: 'auto'
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
      boxShadow: '0 14px 20px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'
    }
  }),

  textArea: {
    padding: '2%',
    background: 'rgba(16, 16, 16, 0.9)',
    color: '#eeeeee',
    maxHeight: '90%',
    overflow: 'hidden',
    borderRadius: `${cornerRadius}`
  },

  paragraph: {
    fontSize: 'calc(12px + 0.5vw)',
    maxHeight: '90%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

};

export default Minicard;
