/**
 * PLAYERUNKNOWN'S BATTLEGROUNDS Page.
 *
 * Some information taken from:
 * https://www.igdb.com/companies/valve-corporation
 */

import React from 'react';
import Game from './Game';

class PLAYERUNKNOWNSBATTLEGROUNDS extends React.Component {
	render() {
		return (
			<div>
				<Game game='PLAYERUNKNOWNS BATTLEGROUNDS' 
					  image1URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
					  image2URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
					  image3URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
				      release='2017'
					  genre='First Person Shooter' 
					  synoposis='Not Available.'
					  developerURL='' developer='PUBG Corp'
					  articleURL='' article=''
					  twitterURL='' twitter=''
					  youtubeURL='' youtube=''
					  twitchURL='' twitch=''
				/>
			</div>
		);
	}
}

export default PLAYERUNKNOWNSBATTLEGROUNDS;