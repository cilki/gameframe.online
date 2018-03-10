
const Navbar = {
    itemMain: {
      color: '#f9f9f9',
      ':hover': {
        backgroundColor: '#595959',
        color: '#f9f9f9',
        boxSizing: 'border-box',
        padding: '15px',
        margin: '-15px',
        filter: 'invert(100%)',
        transition: 'color 1.0s ease, background-color 0.5s ease, invert 0.5s ease'
      }
    },
    navItem: {
    ':hover': {
      backgroundColor: 'red',
      color: 'red',
      maxWidth: '24px'
    },
    imagge: {
      width: '24px !important',
      height: '24px !important',
      filter: 'grayscale(100%) invert(100%) !important',
      paddingRight: '4px !important',
      ':hover': {
        filter: 'grayscale(100%) invert(50%) !important'
      }
    }
  }
};

export { Navbar };
