/**
 * Styles for the about page
 */

export default {
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  pad: {
    padding: '20px 2% 20px 2%',
  },
  container: {
    padding: '2% 2% 2% 2%',
    margin: 'auto',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
  },
  brand: {
    margin: '2% 2% 2% 2%',    
  },
  title: {
    padding: '0% 2% 0% 2%',
    fontSize: 'calc(16px + 1vw)',
    color: '#000000',
    textAlign: 'center',
  },
  paragraph: {
    padding: '0% 2% 0% 2%',
    fontSize: 'calc(8px + 1vw)',
    color: '#000000',
  },
  label: {
    padding: '2% 2% 2% 2%',
    margin: 'auto',
    width: '96%',
    fontSize: 'calc(6px + 1vw)',
    color: '#000000',
    backgroundColor: '#A9A9A9',
    borderColor: '#A9A9A9',
    borderRadius: '4px',
    opacity: '0.2',
    ':hover': {
      opacity: '0.8',
    },
  },
  hr: {
    border: '1px solid #000000',
    backgroundColor: '#000000',
  },
  grid: {
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardPad: {
     padding: '4% 4% 4% 4%', 
  },
  cardMember: {
    height: '75vh',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    border: '1px solid #000000',
    borderRadius: '4px',
    padding: '2% 2% 2% 2%',
  },
  cardInfo: {
    height: '40vh',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    border: '1px solid #000000',
    borderRadius: '4px',     
  },
  cardTool: {
    height: '40vh',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    border: '1px solid #000000',
    borderRadius: '4px',   
  },
  cardImage: {
    display: 'flex', 
    margin: 'auto', 
    padding: '2% 2% 2% 2%', 
    width: '100%',  
  },
  cardExpand: {
    ':hover': {
       height: '100%',
    },      
  },
  cardArrow: {
    width: '100%',
    height: '4vh',
    padding: '2% 2% 2% 2%',    
  }
}
