
const Navbar = {
    itemMain: {
      color: '#f9f9f9',
      transition: 'color 3.0s ease-out, background-color 0.3s ease-out, invert 0.3s ease-out',
      padding: '15px',
      margin: '-15px',
      ':hover': {
        backgroundColor: '#595959',
        color: '#f9f9f9',
        boxSizing: 'border-box',
        padding: '15px',
        margin: '-15px',
        filter: 'invert(100%)',
        transition: 'color 3.0s ease-in, background-color 0.3s ease-in, invert 0.3s ease-in'
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
