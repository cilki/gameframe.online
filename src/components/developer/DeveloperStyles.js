
const Developer = {
  container: logoURL => ({
    backgroundImage: `url(${logoURL})`,
    backgroundSize: 'cover',
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    WebkitFilter: 'saturate(4) blur(64px)',
    MozFilter: 'saturate(4) blur(64px)',
    MsFilter: 'saturate(4) blur(64px)',
    OFilter: 'saturate(4) blur(64px)',
    filter: 'saturate(4) blur(64px)',
    zIndex: '-101',
    display: 'block',
    WebkitTransition: '-webkit-filter 2s',
    MozTransition: '-moz-filter 2s',
    MsTransition: '-ms-filter 2s',
    OTransition: '-o-filter 2s',
    transition: 'filter 2s',
    WebkitTransform: 'scale(1.4)',
    MozTransform: 'scale(1.4)',
    MsTransform: 'scale(1.4)',
    OTransform: 'scale(1.4)',
    transform: 'translateZ(0) scale(1.4)',
  }),
  border: {
    padding: '2% 2% 2% 2%',
  },
  name: {
    paddingLeft: '5%',
  },
  logo: {
    display: 'block',
    float: 'left',
    paddingRight: '2%',
    maxHeight: '128px',
    maxWidth: '200px',
    width: 'auto',
    height: 'auto',
  },
  secondaryInfo: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: '50%',
  },
  imageContainer: {
    maxWidth: '33.333333%',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    transform: 'none',
    zIndex: '1',
  },
  imageContainerHover: {
    overflow: 'visible',
    transform: 'scale(1.1)',
    zIndex: '100',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    transition: 'box-shadow 0.3s',
    boxShadow: 'none',
  },
  imageHover: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  imageGallery: {
    display: 'flex',
    overflow: 'visible',
  },
  about: {
    padding: '20px 2% 20px 2%',
  },
  developer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  articles: {
    paddingLeft: '2%',
    maxWidth: '70%',
    maxHeight: '35vh',
    overflow: 'scroll',
  },
  twitter: {
    paddingLeft: '2%',
  },
  games: {
    paddingLeft: '2%',
    maxWidth: '70%',
    maxHeight: '35vh',
    overflow: 'scroll',
  },
  jumboTron: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
  },
};

export default Developer;
