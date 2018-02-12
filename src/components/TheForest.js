/**
 * The Forest Page.
 *
 * Some information taken from:
 * https://www.igdb.com/companies/valve-corporation
 */

import React from 'react';
import Game from './Game';

class TheForest extends React.Component {
	render() {
		return (
			<div>
				<Game game='The Forest' 
					  image1URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
					  image2URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
					  image3URL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
				      release='2014'
					  genre='' 
					  synoposis='Not Available.'
					  developerURL='' developer='Endnight Games Ltd.'
					  articleURL='' article=''
					  twitterURL='' twitter=''
					  youtubeURL='' youtube=''
					  twitchURL='' twitch=''
				/>
			</div>
		);
	}
}

export default TheForest;