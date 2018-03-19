
const Developer = {
  container: logoURL => ({
    backgroundImage: `url(${logoURL})`,
    backgroundSize: 'cover',
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    filter: 'blur(64px) saturate(200%)',
    zIndex: '-101',
    display: 'block',
    transition: 'hue-rotate 2s',
    transform: 'scale(1.4)',
  }),
  border: {
    padding: '2% 2% 2% 2%',
  },
  name: {
    paddingLeft: '5%',
  },
  logo: {
    display: 'inline',
    float: 'right',
    paddingRight: '2%',
    maxWidth: '25%',
    maxHeight: '25%',
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
  },
  twitter: {
    paddingLeft: '2%',
  },
  games: {
    paddingLeft: '2%',
  },
  jumboTron: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
  },
};

export default Developer;
