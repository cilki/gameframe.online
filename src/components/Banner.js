/**
 * Banner component that goes across the top of the screen.
 */

import React from 'react';
import { Image } from 'react-bootstrap';

class Banner extends React.Component {
	render() {
		return (
			<img height={350} src="https://hdwallsource.com/img/2014/12/video-game-wallpapers-8223-8556-hd-wallpapers.jpg" alt="Video Game Characters" />
		);
	}
}

export default Banner;