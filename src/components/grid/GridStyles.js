
export default {
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
    justifyContent: 'space-around',
    maxWidth: '100%',
    paddingTop: '2%',
    zIndex: 1,
  },

  topCluster: {
    position: 'relative',
    width: '98vw',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    filter: 'hue-rotate(170deg) invert(90%) saturate(300%) brightness(90%) grayscale(25%)',
    zIndex: '10'
  },

  sortContainer: {
    margin: 'auto',
    maxWidth: '33%',
    marginTop: '20px',
    flexGrow: '1'
  },

  gridPaginationContainer: {
    paddingLeft: '2%',
    paddingRight: '2%'
  },

  filterContainer: {
    margin: 'auto',
    marginTop: '20px',
    maxWidth: '33%',
    display: 'flex',
    flexGrow: '1'
  },

  filterSelectContainer: {
    margin: 'auto',
    marginTop: '0',
    maxWidth: '100%',
    display: 'block',
    flexGrow: '1'
  }
};
