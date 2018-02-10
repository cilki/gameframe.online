/**
 * Splash page carousel.
 */

import React from 'react';
import { Carousel, Image } from 'react-bootstrap'; 
// import CarouselItem from './CarouselItem';

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
				  {/*childComponents*/}
				  <Carousel.Item>
				    <img width={900} height={500} alt="900x500" src="http://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1516879634" />
				  </Carousel.Item>
				  <Carousel.Item>
				    <img width={900} height={500} alt="900x500" src="http://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg?t=1512411524" />
				  </Carousel.Item>
				  <Carousel.Item>
				    <img width={900} height={500} alt="900x500" src="http://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg?t=1512003663" />
				  </Carousel.Item>
				  <Carousel.Item>
				    <img width={900} height={500} alt="900x500" src="http://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg?t=1478631950" />
				  </Carousel.Item>
				</Carousel>
			</div>
		);
	}
}

export default SplashPage;