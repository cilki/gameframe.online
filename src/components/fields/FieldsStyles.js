/**
 * Styles for the Fields component.
 */

export default {
  flexColumn: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
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
    '@media screen and (max-width: 599px)': {
      width: '36vw',
    },
  },
  item: {
    backgroundColor: '#777',
    borderColor: '#777',
    borderRadius: '6px',
    whiteSpace: 'nowrap',
    fontSize: 'calc(3px + 0.6vw)',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    textAlign: 'center',
    '@media screen and (max-width: 599px)': {
      fontSize: 'calc(3px + 1.6vw)',
    },
  },
  label: {
    backgroundColor: '#777',
    borderColor: '#777',
    borderRadius: '6px',
    margin: '0% 2% 0% 2%',
    padding: '2% 2% 2% 2%',
  },
  icon: {
    backgroundColor: '#777',
    borderColor: '#777',
    borderRadius: '6px',
    margin: '0% 2% 0% 2%',
    padding: '2% 2% 2% 2%',
  },
  iconImage: factor => ({
    minWidth: '4px',
    maxWidth: '32px',
    width: `calc((4px + 1.6vw) * ${factor})`,
    minHeight: '4px',
    maxHeight: '32px',
    height: `calc((4px + 1.6vw) * ${factor})`,
    borderRadius: '6px',
    '@media screen and (max-width: 599px)': {
      width: `calc((4px + 3.6vw) * ${factor})`,
      height: `calc((4px + 3.6vw) * ${factor})`,
    },
  }),
  esrbImage: factor => ({
    minHeight: '4px',
    maxHeight: '32px',
    height: `calc((4px + 1.6vw) * ${factor})`,
    borderRadius: '6px',
    '@media screen and (max-width: 599px)': {
      height: `calc((4px + 3.6vw) * ${factor})`,
    },
  }),
  largeText: factor => ({
    fontSize: `calc((6px + 0.6vw) * ${factor})`,
    padding: '4% 0% 0% 0%',
    fontWeight: 'bold',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    '@media screen and (max-width: 599px)': {
      fontSize: `calc((6px + 1.6vw) * ${factor})`,
    },
  }),
  smallText: factor => ({
    fontSize: `calc((3px + 0.6vw) * ${factor})`,
    fontWeight: 'lighter',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    '@media screen and (max-width: 599px)': {
      fontSize: `calc((3px + 1.6vw) * ${factor})`,
    },
  }),
  urlText: factor => ({
    fontSize: `calc((1px + 0.6vw) * ${factor})`,
    textAlign: 'left',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    '@media screen and (max-width: 599px)': {
      fontSize: `calc((1px + 1.6vw) * ${factor})`,
    },
  }),
};
