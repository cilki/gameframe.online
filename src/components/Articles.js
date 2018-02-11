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
					<Card cover='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png' company='Valve Corporation'  year='1996' title='Developer'/>
					<Card cover='https://images.igdb.com/igdb/image/upload/t_logo_med/j6prddiusdbjqdktjzgu.png' company='PUBG Corp' year='2017' title='Developer' />
					<Card cover='https://www.giantbomb.com/images/1300-2569978' company='Endnight Games Ltd' year='2014' title='Developer'/>
					<Card cover='https://images.igdb.com/igdb/image/upload/t_logo_med/iosg1iatkemmtzdlu3zf.png' company='Psyonix' year='2000' title='Developer' />
				</div>
			</div>
    );
  }
}

export default Articles;
