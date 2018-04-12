/**
 * Styles for the Tooltip component
 */

export default {
  flexColumn: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    minWidth: '16px',
    maxWidth: '224px',
    width: '16vw',
    '@media screen and (max-width: 512px)': {
      width: '32vw',
    },
  },
  item: {
    backgroundColor: '#777',
    borderColor: '#777',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    fontSize: 'calc(4px + 0.75vw)',
    textAlign: 'center',
  },
  label: {
    backgroundColor: '#777',
    borderColor: '#777',
    borderRadius: '4px',
    margin: '0% 2% 0% 2%',
    padding: '0% 2% 0% 2%',
  },
  icon: {
    backgroundColor: '#777',
    borderColor: '#777',
    borderRadius: '4px',
    margin: '2% 2% 2% 2%',
    padding: '2% 2% 2% 2%'  
  },
  iconImage: {
    minWidth: '5px',
    maxWidth: '30px',
    width: 'calc(5px + 2vw)',
    minHeight: '5px',
    maxHeight: '30px',
    height: 'calc(5px + 2vw)',
    borderRadius: '4px'    
  },
  largeText: {
    fontSize: 'calc(6px + 0.75vw)',
    padding: '0% 2% 0% 2%',
  },
  smallText: {
    fontSize: 'calc(4px + 0.75vw)',
    padding: '0% 2% 0% 2%',
  },
  urlText: {
    fontSize: 'calc(2px + 0.5vw)',
    textAlign: 'left'
  }
};
