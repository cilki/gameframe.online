/**
 * Styles for the about page
 */

export default {
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  pad: {
    padding: '20px 2% 20px 2%'
  },
  container: {
    padding: '2% 2% 2% 2%',
    margin: 'auto',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    backgroundColor: '#ffffff'
  },
  title: {
    padding: '0% 2% 0% 2%',
    fontSize: 'calc(16px + 1vw)',
    textAlign: 'center'
  },
  paragraph: {
    padding: '0% 2% 0% 2%',
    fontSize: 'calc(8px + 0.5vw)'
  },
  label: {
    padding: '2% 2% 2% 2%',
    margin: 'auto',
    width: '96%',
    fontSize: 'calc(6px + 1vw)',
    color: '#000000',
    backgroundColor: '#F0F0F0',
    borderColor: '#F0F0F0',
    borderRadius: '4px',
    opacity: '1.0',
    ':hover': {
      opacity: '0.8',
      backgroundColor: '#D3D3D3',
      borderColor: '#D3D3D3',
    }
  },
  hr: {
    border: '1px solid #A9A9A9',
    backgroundColor: '#A9A9A9'
  },
  grid: {
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  cardPad: {
     padding: '2% 2% 2% 2%' 
  },
  cardMember: {
    //height: 'calc(300px + 15vw)',
    height: '75vh',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    border: '1px solid #A9A9A9',
    borderRadius: '4px',
    padding: '2% 2% 2% 2%'
  },
  cardInfo: {
    //height: 'calc(200px + 10vw)',
    height: '35vh',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    border: '1px solid #A9A9A9',
    borderRadius: '4px'     
  },
  cardTool: {
    //height: 'calc(200px + 10vw)',
    height: '45vh',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    border: '1px solid #A9A9A9',
    borderRadius: '4px'   
  },
  cardMemberImage: {
    display: 'flex', 
    margin: 'auto', 
    padding: '2% 2% 2% 2%', 
    width: '100%'    
  },
  cardToolImage: {
    display: 'flex', 
    margin: 'auto', 
    padding: '2% 2% 2% 2%', 
    width: '100%',
    maxWidth: '150px',
    maxHeight: '150px'    
  },
  cardToolTitle: {
    padding: '0% 2% 0% 2%',
    fontSize: 'calc(12px + 1vw)',
    textAlign: 'center'
  },
  cardToolParagraph: {
    padding: '0% 2% 0% 2%',
    fontSize: 'calc(6px + 0.5vw)'
  },
  cardExpand: {
    ':hover': {
       height: '100%'
    }     
  },
  cardArrow: {
    width: '100%',
    height: '4vh',
    padding: '2% 2% 2% 2%'    
  },
  favGamesTitle: {
    padding: '0% 2% 0% 2%',
    fontSize: 'calc(8px + 0.5vw)',
    textAlign: 'center'  
  },
  favGamesContainer: {
    width: '50%',
    height: '15vh',
    padding: '1% 1% 1% 1%'
  },
  stats: {
    padding: '0% 2% 0% 2%',
    fontSize: 'calc(8px + 0.5vw)',
    textAlign: 'center'    
  },
  statsHr: {
    border: '1px solid #A9A9A9',
    backgroundColor: '#A9A9A9',
    width: '50%'
  },
}
