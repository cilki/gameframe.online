
export default {
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
    justifyContent: 'space-between',
    maxWidth: '100%',
    paddingTop: '2%',
    paddingLeft: '2%',
    paddingRight: '2%',
    margin: 'auto',
    zIndex: 1,
    '&:after': {
      content: '',
      flex: 'auto',
    },
  },

  endSpacer: {
    content: '',
    flex: 'auto',
  },

  topCluster: {
    position: 'relative',
    width: '98vw',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    filter: 'hue-rotate(170deg) invert(90%) saturate(300%) brightness(90%) grayscale(25%)',
    zIndex: '10',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      flexFlow: 'row wrap',
    },
  },

  sortContainer: {
    margin: '20px auto auto auto',
    maxWidth: '33%',
    flexGrow: '1',
    '@media screen and (max-width: 600px)': {
      minWidth: '98vw',
    },
  },

  gridPaginationContainer: {
    paddingLeft: '2%',
    paddingRight: '2%',
    '@media screen and (max-width: 600px)': {
      display: 'flex',
      minWidth: '100vw',
      width: '100vw',
      maxWidth: '100vw',
      margin: '0 auto -20px auto',
      paddingTop: '-20px',
      paddingBottom: '-20px',
    },
  },

  filterContainer: {
    marginTop: '20px auto auto auto',
    maxWidth: '33%',
    display: 'flex',
    flexGrow: '1',
    '@media screen and (max-width: 600px)': {
      minWidth: '98vw',
    },
  },

  filterSelectContainer: {
    marginTop: '0 auto auto auto',
    maxWidth: '100%',
    display: 'block',
    flexGrow: '1',
  },
};
