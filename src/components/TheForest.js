/**
 * The Forest Page.
 *
 * Some information taken from:
 * /static/data/games/TheForest.json
 */

import React from 'react';
import Game from './Game';

class TheForest extends React.Component {
	render() {
		return (
			<div>
				<Game game='The Forest' 
					  image1URL='http://cdn.akamai.steamstatic.com/steam/apps/242760/ss_8ccb821c4df3fafdf4161d77f38635441a8157f2.1920x1080.jpg?t=1478631950'
					  image2URL='http://cdn.akamai.steamstatic.com/steam/apps/242760/ss_53c615d49c4777144ed7359e4bf7c9eb6838cc8e.1920x1080.jpg?t=1478631950'
					  image3URL='http://cdn.akamai.steamstatic.com/steam/apps/242760/ss_772eebf0ce7bdb51546055a36185e8ee46e8acac.1920x1080.jpg?t=1478631950'
				      release='May 30, 2014'
					  genre='Action, Adventure, Indie, Simulation, & Early Access' 
					  synoposis='As the lone survivor of a passenger jet crash, you find yourself in a mysterious forest battling 
					             to stay alive against a society of cannibalistic mutants. Build, explore, survive in this 
								 terrifying first person survival horror simulator.'
					  developerURL='/EndnightGamesLtd' developer='Endnight Games Ltd.'
					  articleURL='/Article3' article='The Forest launches this April, after four years lost in the woods'
					  twitterURL='' twitter={{widgetId: '963620175491883008'}}
					  youtubeURL='' youtube=''
					  twitchURL='' twitch=''
					coverURL='https://images.igdb.com/igdb/image/upload/t_cover_big/taf1unbzsejvvjiicaqk.jpg'
				/>
			</div>
		);
	}
}

export default TheForest;
