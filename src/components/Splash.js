/**
 * Splash page carousel.
 */

import React from 'react';
import { Carousel, Image } from 'react-bootstrap'; 

const games = [
	'/static/data/games/PLAYERUNKNOWN\'S BATTLEGROUNDS.json',
	'/static/data/games/Portal 2.json',
	'/static/data/games/Rocket League.json',
	'/static/data/games/TheForest.json'
];

class SplashPage extends React.Component {
	constructor() {
		super();

		this.state = {
			items: []
		};
	}

	componentDidMount() {
		this.setState({
			items: games
		});
	}

	render() {

		return (
			<div
				style={{
					height: 'auto',
					minHeight: '100%'
				}}
			>
				<Carousel>
					<Carousel.Item>
						<a href="/games" target="_blank">
							<img style={{margin: 'auto'}} width={900} height={500} alt="PLAYERUNKNOWN'S BATTLEGROUNDS" src="http://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1516879634" />
						</a>
					</Carousel.Item>
					<Carousel.Item>
						<a href="/games" target="_blank">
							<img style={{margin: 'auto'}} width={900} height={500} alt="Portal 2" src="http://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg?t=1512411524" />
						</a>
					</Carousel.Item>
					<Carousel.Item>
						<a href="/games" target="_blank">
							<img style={{margin: 'auto'}} width={900} height={500} alt="Rocket League" src="http://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg?t=1512003663" />
						</a>
					</Carousel.Item>
					<Carousel.Item>
						<a href="/games" target="_blank">
							<img style={{margin: 'auto'}} width={900} height={500} alt="The Forest" src="http://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg?t=1478631950" />
						</a>
					</Carousel.Item>
				</Carousel>
			</div>
		);
	}
}

export default SplashPage;