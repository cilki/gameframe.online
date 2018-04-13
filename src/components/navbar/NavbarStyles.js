/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * NavbarStyles.js                                                           *
 * This file contains CSS style properties intended for use with elements in *
 * the Navbar.js file. Below are some parameters that may be used to quickly *
 * change the general appearance of the navigation bar.                      *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const navbarRoundness = '0';
const searchFormRoundness = '2px';


const Navbar = {

  main: {
    borderRadius: `${navbarRoundness}`,
    background: '#272727',
    borderLeft: 'none',
    borderRight: 'none',
    marginBottom: '0',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },

  brandContainer: {
    height: '32px',
    paddingRight: '140px',
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
      transition: 'filter 0.1s linear',
    },
  },

  formControl: {
    borderRadius: `${searchFormRoundness}`,
  },

  button: {
    borderRadius: `${searchFormRoundness}`,
  },

  itemMain: {
    color: '#888888',
    transition: 'color 0.2s ease-out, background-color 0.3s ease-out, invert 0.3s ease-out', //eslint-disable-line
    padding: '15px',
    margin: '-15px',
    transition: 'filter 0.1s linear', //eslint-disable-line
    ':hover': {
      backgroundColor: '#333333',
      transition: 'color 0.25s ease-out, background-color 0.15s ease-out, invert 0.15s ease-out', //eslint-disable-line
      padding: '15px',
      margin: '-15px',
      filter: 'brightness(200%)',
      transition: 'filter 0.1s linear, background 0.1s linear', //eslint-disable-line
    },
  },

  navImage: {
    width: '24px',
    height: '24px',
    filter: 'grayscale(100%) invert(50%)',
    paddingRight: '4px',
  },
};

export default Navbar;
