
const Navbar = {
  itemMain: {
    color: '#888888',
    transition: 'color 0.2s ease-out, background-color 0.3s ease-out, invert 0.3s ease-out',
    padding: '15px',
    margin: '-15px',
    ':hover': {
      backgroundColor: '#595959',
      color: '#f9f9f9',
      transition: 'color 0.25s ease-out, background-color 0.15s ease-out, invert 0.15s ease-out',
      padding: '15px',
      margin: '-15px',
      ':hover': {
        backgroundColor: '#343434',
        color: '#f9f9f9',
        boxSizing: 'border-box',
        padding: '15px',
        margin: '-15px',
        filter: 'invert(90%)',
        transition: 'color 0.25s ease-in, background-color 0.15s ease-in, invert 0.15s ease-in',
      },
    },
  },
  navImage: {
      width: '24px',
      height: '24px',
      filter: 'grayscale(100%) invert(100%)',
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
      ':hover': {
        color: '#f9f9f9',
        filter: 'invert(90%)',
        transition: 'color 0.25s ease-in, background-color 0.15s ease-in, invert 0.15s ease-in',
      },
    },
    ':active': {
        color: '#f9f9f9'
    }
  }
};

export default Navbar;
