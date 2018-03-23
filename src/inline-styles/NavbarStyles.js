
const Navbar = {

  main: {
    borderRadius: '0',
    background: '#272727',
    borderLeft: 'none',
    borderRight: 'none',
    marginBottom: '0',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
  },

  brandContainer: {
    height: '32px',
    paddingRight: '140px'
  },

  brandImage: {
    position: 'absolute',
    height: '54px',
    filter: 'invert(50%)',
    transition: 'filter 0.1s linear',
    padding: '15px',
    margin: '-15px',
    ':hover': {
        filter: 'invert(90%)',
        transition: 'filter 0.1s linear'
    }
  },

  itemMain: {
    color: '#888888',
    transition: 'color 0.2s ease-out, background-color 0.3s ease-out, invert 0.3s ease-out',
    padding: '15px',
    margin: '-15px',
    transition: 'filter 0.1s linear',
    ':hover': {
      backgroundColor: '#333333',
      transition: 'color 0.25s ease-out, background-color 0.15s ease-out, invert 0.15s ease-out',
      padding: '15px',
      margin: '-15px',
      filter: 'brightness(200%)',
      transition: 'filter 0.1s linear, background 0.1s linear'
    },
  },
  navImage: {
      width: '24px',
      height: '24px',
      filter: 'grayscale(100%) invert(50%)',
      paddingRight: '4px',
      ':hover': {
          filter: 'invert(100%)'
      }
  },

  brand: {
    textDecoration: 'none',
    color: '#595959',
      padding: '15px',
      margin: '-15px',
    transition: 'color 0.15s ease-out, background-color 0.15s ease-out, invert 0.15s ease-out',
    ':hover': {
      color: '#f9f9f9',
      transition: 'color 0.25s ease-out, background-color 0.15s ease-out, invert 0.15s ease-out',
    },
  }
};

export default Navbar;
