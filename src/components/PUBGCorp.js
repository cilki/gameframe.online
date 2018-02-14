/**
 * PUBG Corp Page.
 *
 * Some information taken from:
 * https://www.igdb.com/companies/pubg-corp
 */

import React from 'react';
import Developer from './Developer';

class PUBGCorp extends React.Component {
	render() {
		return (
			<div>
				<Developer developer='PUBG Corp' 
					       logoURL='https://images.igdb.com/igdb/image/upload/t_logo_med/j6prddiusdbjqdktjzgu.png'
				           year='2017'
					       loc='Seoul, South Korea' 
					       about='Previously known as Bluehole Ginno Games, the bit of Bluehole Studio behind the wildly 
						          successful FPS Playerunknown’s Battlegrounds. Is a subsidiary of Bluehole Studio whose 
								  purpose is the expansion of strategic business opportunities that include the game’s 
								  potential in the esports sector and the growth of PUBG as a true global IP franchise. 
								  As well as the continued development and maintenance of Playerunknown’s Battleground 
								  (PUBG).'
					       gameURL='/PLAYERUNKNOWNSBATTLEGROUNDS' game='PLAYERUNKNOWNS BATTLEGROUNDS'
					       articleURL='/Article2' article='Will Smiths Top 7 Games of 2017'
					       twitterURL='' twitter=''
				/>
			</div>
		);
	}
}

export default PUBGCorp;
