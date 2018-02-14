/**
 * Portal 2 Page.
 *
 * Some information taken from:
 * /static/data/games/Portal 2.json
 */

import React from 'react';
import Game from './Game';

class Portal2 extends React.Component {

	render() {
		return (
			<div>
				<Game game='Portal 2' 
					  image1URL='http://cdn.akamai.steamstatic.com/steam/apps/620/ss_f3f6787d74739d3b2ec8a484b5c994b3d31ef325.1920x1080.jpg?t=1512411524'
					  image2URL='http://cdn.akamai.steamstatic.com/steam/apps/620/ss_6a4f5afdaa98402de9cf0b59fed27bab3256a6f4.1920x1080.jpg?t=1512411524'
					  image3URL='http://cdn.akamai.steamstatic.com/steam/apps/620/ss_0cdd90fafc160b52d08b303d205f9fd4e83cf164.1920x1080.jpg?t=1512411524'
				      release='Apr 18, 2011'
					  genre='Action & Adventure' 
					  synoposis='Portal 2 draws from the award-winning formula of innovative gameplay, story, and music that earned the original 
                                 Portal over 70 industry accolades and created a cult following. The single-player portion of Portal 2 introduces 
                                 a cast of dynamic new characters, a host of fresh puzzle elements, and a much larger set of devious test chambers. 
                                 Players will explore never-before-seen areas of the Aperture Science Labs and be reunited with GLaDOS, the 
                                 occasionally murderous computer companion who guided them through the original game. The games two-player 
                                 cooperative mode features its own entirely separate campaign with a unique story, test chambers, and two new player 
                                 characters. This new mode forces players to reconsider everything they thought they knew about portals. Success will 
                                 require them to not just act cooperatively, but to think cooperatively.'
					  developerURL='/ValveCorporation' developer='Valve Corporation'

					  articleURL='/Article1' article='Bridge Constructor Portal isnt a rollercoaster of laughs, but its still good'

					  twitterURL='' twitter='963620401627754496'
					  youtubeURL='' youtube=''
					  twitchURL='' twitch=''
			                  coverURL='https://images.igdb.com/igdb/image/upload/t_cover_big/w6kusdugzlssi3yqcbwl.jpg'
				/>
			</div>
		);
	}
}

export default Portal2;
