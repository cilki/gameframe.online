
const Game = {
  border: {
    padding: '0 2% 2% 2%',
  },
  jumboTron: {
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    name: {
      paddingLeft: '5%'
    },
    secondaryInfo: {
      display: 'flex',
      justifyContent: 'space-around'
    },
    imageGallery: {
      display: 'flex',
      overflow: 'visible',
      imageContainer: {
        maxWidth: '33.333333%',
        overflow: 'hidden',
        transition: 'transform 0.2s',
        transform: 'none',
        zIndex: '1',
        hover: {
          overflow: 'visible',
          transform: 'scale(1.1)',
          zIndex: '100'
        },
      },
      image: {
        maxWidth: '100%',
        maxHeight: '100%',
        transition: 'box-shadow 0.3s',
        boxShadow: 'none',
        hover: {
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        },
      },
    },
    synoposis: {
      padding: '20px 2% 20px 2%'
    },
    developer: {
      display: 'flex',
      justifyContent: 'space-around'
    },
    articles: {
      paddingLeft: '2%'
    },
    twitter: {
      paddingLeft: '2%'
    },
    youtube: {
      paddingLeft: '2%'
    },
    twitch: {
      paddingLeft: '2%'
    }
  }
}

export { Game };
