/**
 * Articles page with a grid layout of cards.
 */
 
import React from 'react';
import Card from './Card';

class Articles extends React.Component {
	render() {
		return (
			<div>
				<div  style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					position: 'relative',
					justifyContent: 'space-around',
					maxWidth: '100%'
				}}>
					<Card url='/Article1' cover='' company='Alex Navarro'  year='April 26, 2012' title='Portal 2s Perpetual Testing Initiative Launching' companyURL='/AlexNavarro'/>
					<Card url='/Article2' cover='' company='Giant Bomb Staff' year='Giant Bomb Staff' title='Will Smiths Top 7 Games of 2017' companyURL='/GiantBombStaff' />
					<Card url='/Article3' cover='' company='DISHMINK' year='February 1, 2017' title='V0.73 and release plans' companyURL='DISHMINK' />
					<Card url='/Article4' cover='https://i.imgur.com/bR8e9SE.jpg' company='DIRKENED' year='January 31, 2017' title='Rocket League Roadmap: Spring 2018' companyURL='/DIRKENED' />
				</div>
			</div>
    );
  }
}

export default Articles;
