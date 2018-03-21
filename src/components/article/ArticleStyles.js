
const Article = {
  container: coverURL => ({
    backgroundImage: `url(${coverURL})`,
    backgroundSize: 'cover',
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    WebkitFilter: 'saturate(2) blur(64px)',
    MozFilter: 'saturate(2) blur(64px)',
    MsFilter: 'saturate(2) blur(64px)',
    OFilter: 'saturate(2) blur(64px)',
    filter: 'saturate(2) blur(64px)',
    zIndex: '-101',
    display: 'block',
    WebkitTransition: '-webkit-filter 2s',
    MozTransition: '-moz-filter 2s',
    MsTransition: '-ms-filter 2s',
    OTransition: '-o-filter 2s',
    transition: 'filter 2s',
    WebkitTransform: 'translateZ(0) scale(1.4)',
    MozTransform: 'translateZ(0) scale(1.4)',
    MsTransform: 'translateZ(0) scale(1.4)',
    OTransform: 'translateZ(0) scale(1.4)',
    transform: 'translateZ(0) scale(1.4)',
  }),
  border: {
    padding: '2% 2% 2% 2%',
  },
  name: {
    paddingLeft: '5%',
  },
  secondaryInfo: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  imageContainer: {
    maxWidth: '33.333333%',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    transform: 'none',
    zIndex: '1',
    ':hover': {
      overflow: 'visible',
      transform: 'scale(1.1)',
      zIndex: '100',
    },
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    transition: 'box-shadow 0.3s',
    boxShadow: 'none',
    ':hover': {
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
  },
  imageGallery: {
    display: 'flex',
    overflow: 'visible',
  },
  synoposis: {
    padding: '20px 2% 20px 2%',
  },
  developer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  articles: {
    paddingLeft: '2%',
  },
  twitter: {
    paddingLeft: '2%',
  },
  youtube: {
    paddingLeft: '2%',
  },
  twitch: {
    paddingLeft: '2%',
  },
  jumboTron: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    opacity: '1.0',
  },
};

export default Article;
