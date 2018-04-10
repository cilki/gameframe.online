/**
 * Styles for the Tooltip component
 */

export default {
  flexColumn: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'    
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'  
  },
  carousel: {
    minWidth: '16px',
    maxWidth: '224px',
    width: '16vw',
    '@media screen and (max-width: 512px)': {
      width: '32vw'
    }
  },
  item: {
    backgroundColor: '#777',
    borderColor: '#777',
    borderRadius: '4px', 
    whiteSpace: 'nowrap', 
    fontSize: 'calc(4px + 0.75vw)',
    textAlign: 'center'
  },
  label: {
    backgroundColor: '#777',
    borderColor: '#777',
    borderRadius: '4px',
    margin: '0% 2% 0% 2%',
    padding: '0% 2% 0% 2%'    
  },
  largeText: {
    fontSize: 'calc(6px + 0.75vw)',
    padding: '0% 2% 0% 2%'
  },
  smallText: {
    fontSize: 'calc(4px + 0.75vw)',
    padding: '0% 2% 0% 2%'
  }
}
