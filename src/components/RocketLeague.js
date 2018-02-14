/**
 * Rocket League Page.
 *
 * Some information taken from:
 * /static/data/games/RocketLeague.json
 */

import React from 'react';
import Game from './Game';

class RocketLeague extends React.Component {
	render() {
		return (
			<div>
				<Game game='Rocket League' 
					  image1URL='http://cdn.akamai.steamstatic.com/steam/apps/252950/ss_8cf824b503da4a44a65d735cede9a59f0c2c132c.1920x1080.jpg?t=1512003663'
					  image2URL='http://cdn.akamai.steamstatic.com/steam/apps/252950/ss_e1b59c3c1cf9eafc1a196406a184d80e4614f2be.1920x1080.jpg?t=1512003663'
					  image3URL='http://cdn.akamai.steamstatic.com/steam/apps/252950/ss_d84ce663949107cdb2bf395afad1cfb1403bfd5b.1920x1080.jpg?t=1512003663'
				      release='Jul 7, 2015'
					  genre='Action, Indie, Racing, & Sports' 
					  synoposis='Soccer meets driving once again in the long-awaited, physics-based sequel to the beloved arena classic, 
					             Supersonic Acrobatic Rocket-Powered Battle-Cars! A futuristic Sports-Action game, Rocket League®, equips 
								 players with booster-rigged vehicles that can be crashed into balls for incredible goals or epic saves 
								 across multiple, highly-detailed arenas. Using an advanced physics system to simulate realistic 
								 interactions, Rocket League® relies on mass and momentum to give players a complete sense of intuitive 
								 control in this unbelievable, high-octane re-imagining of association football.'
					  developerURL='/Psyonix' developer='Psyonix'
					  articleURL='/Article4' article='Rocket League Roadmap: Spring 2018'
					  twitterURL='' twitter='963610623220375553'
					  youtubeURL='' youtube=''
					  twitchURL='' twitch=''
					coverURL='https://images.igdb.com/igdb/image/upload/t_cover_big/edkpgyqgfsxyiby9pyj5.jpg'
				/>
			</div>
		);
	}
}

export default RocketLeague;
