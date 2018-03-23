
const Article = {
  border: {
    padding: '0 2% 2% 2%',
  },
  title: {
    paddingLeft: '5%',
  },
  secondaryInfo: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  imageContainer: {
    maxHeight: '33.333333%',
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
    justifyContent: 'center',
  },
  summary: {
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

export default Article;
