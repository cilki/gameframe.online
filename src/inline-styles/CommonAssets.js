const CommonAssets = {
  stripeOverlay: {
    background: 'repeating-linear-gradient(rgba(39, 39, 39, 0.5), rgba(39, 39, 39, 0.5) 1px, rgba(52, 51, 52, 0.5) 1px, rgba(52, 51, 52, 0.5) 2px)',
    WebkitTransform: 'translateZ(0)',
    MozTransform: 'translateZ(0)',
    MsTransform: 'translateZ(0)',
    OTransform: 'translateZ(0)',
    transform: 'translateZ(0)'
  },

  horizontalGradient: {
    background: 'linear-gradient(to right, black, #090909, #191919, #191919, #090909, black)',
    zIndex: '-101',
    WebkitTransform: 'translateZ(0)',
    MozTransform: 'translateZ(0)',
    MsTransform: 'translateZ(0)',
    OTransform: 'translateZ(0)',
    transform: 'translateZ(0)'
  },

  backgroundColor: {
    backgroundColor: '#060606',
  },

  fillBackground: {
    zIndex: '-100',
    position: 'fixed',
    top: '0px',
    bottom: '0px',
    width: '100%',
  },

};

export default CommonAssets;
