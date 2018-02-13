/**
 * PLAYERUNKNOWN'S BATTLEGROUNDS Page.
 *
 * Some information taken from:
 * /static/data/games/PLAYERUNKNOWN'S BATTLEGROUNDS.json
 */

import React from 'react';
import Game from './Game';

class PLAYERUNKNOWNSBATTLEGROUNDS extends React.Component {
	render() {
		return (
			<div>
				<Game game='PLAYERUNKNOWNS BATTLEGROUNDS' 
					  image1URL='http://cdn.akamai.steamstatic.com/steam/apps/578080/ss_23af2e59855a833c22d0c11ca23a719f54a554ff.1920x1080.jpg?t=1516879634'
					  image2URL='http://cdn.akamai.steamstatic.com/steam/apps/578080/ss_2c79b3b590b186b10bf082d37674621f204a3497.1920x1080.jpg?t=1516879634'
					  image3URL='http://cdn.akamai.steamstatic.com/steam/apps/578080/ss_e7e79847eff0933de92192bb62b8bc7068d611da.1920x1080.jpg?t=1516879634'
				      release='Dec 21, 2017'
					  genre='Violent, Action, Adventure, & Massively Multiplayer' 
					  synoposis='PLAYERUNKNOWNS BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback. 
					             Starting with nothing, players must fight to locate weapons and supplies in a battle to be the lone 
								 survivor. This realistic, high tension game is set on a massive 8x8 km island with a level of detail 
								 that showcases Unreal Engine 4s capabilities. PLAYERUNKNOWN aka Brendan Greene, is a pioneer of the 
								 Battle Royale genre. As the creator of the Battle Royale game-mode found in the ARMA series and H1Z1 
								 : King of the Kill, Greene is co-developing the game with veteran team at Bluehole to create the most 
								 diverse and robust Battle Royale experience to date. Not Just a Game. This is BATTLE ROYALE!'
					  developerURL='/PUBGCorp' developer='PUBG Corp'
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
