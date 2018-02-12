/**
 * Rocket League Page.
 *
 * Some information taken from:
 * https://www.igdb.com/companies/valve-corporation
 */

import React from 'react';
import Game from './Game';

class RocketLeague extends React.Component {
	render() {
		return (
			<div>
				<Game game='Rocket League' 
					  image1URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
					  image2URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
					  image3URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
				      release='2017'
					  genre='' 
					  synoposis='Not Available.'
					  developerURL='' developer='Psyonix'
					  articleURL='' article=''
					  twitterURL='' twitter=''
					  youtubeURL='' youtube=''
					  twitchURL='' twitch=''
				/>
			</div>
		);
	}
}

export default RocketLeague;