/**
 * Articles page with a grid layout of cards.
 */
 
import React from 'react';
import TextCard from './TextCard';

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
					<TextCard url='/Article1' cover='' company='Brendan Caldwell'  year='January 10, 2018' title='Bridge Constructor Portal isnt a rollercoaster of laughs, but its still good' companyURL='/AlexNavarro'/>
					<TextCard url='/Article2' cover='' company='Giant Bomb Staff' year='Giant Bomb Staff' title='Will Smiths Top 7 Games of 2017' companyURL='/GiantBombStaff' />
					<TextCard url='/Article3' cover='' company='DISHMINK' year='February 1, 2017' title='V0.73 and release plans' companyURL='DISHMINK' />
					<TextCard url='/Article4' cover='https://i.imgur.com/bR8e9SE.jpg' company='DIRKENED' year='January 31, 2017' title='Rocket League Roadmap: Spring 2018' companyURL='/DIRKENED' />
				</div>
			</div>
    );
  }
}

export default Articles;
