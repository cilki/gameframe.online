/**
 * Portal 2 Page.
 *
 * Some information taken from:
 * https://www.igdb.com/companies/valve-corporation
 */

import React from 'react';
import Game from './Game';

class Portal2 extends React.Component {
	render() {
		return (
			<div>
				<Game game='Portal 2' 
					  image1URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
					  image2URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
					  image3URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
				      release='1996'
					  genre='First Person Shooter' 
					  synoposis='Not Available.'
					  developerURL='' developer='Valve Software'
					  articleURL='' article=''
					  twitterURL='' twitter=''
					  youtubeURL='' youtube=''
					  twitchURL='' twitch=''
				/>
			</div>
		);
	}
}

export default Portal2;