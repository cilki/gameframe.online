const CommonAssets = {
  stripeOverlay: {
    backgroundImage: 'linear-gradient(rgba(39, 39, 39, 0.5), rgba(39, 39, 39, 0.5) 1px, rgba(52, 51, 52, 0.5) 1px, rgba(52, 51, 52, 0.5) 2px)',
    backgroundSize: '1px 2px',
  },

  horizontalGradient: {
    WebkitTransform: 'translateZ(0)',
    MozTransform: 'translateZ(0)',
    MsTransform: 'translateZ(0)',
    OTransform: 'translateZ(0)',
    transform: 'translateZ(0)',
    backgroundImage: 'linear-gradient(to right, black, #090909, #191919, #191919, #090909, black)',
    backgroundSize: '100% 1px',
    backgroundRepeat: 'repeat-y',
    zIndex: '-101',
  },

  backgroundColor: {
    backgroundColor: '#060606',
  },

  fillBackground: {
    WebkitTransform: 'translateZ(0)',
    MozTransform: 'translateZ(0)',
    MsTransform: 'translateZ(0)',
    OTransform: 'translateZ(0)',
    transform: 'translateZ(0)',
    zIndex: '-100',
    position: 'fixed',
    top: '0px',
    bottom: '0px',
    width: '100%',
  },

};

export default CommonAssets;
