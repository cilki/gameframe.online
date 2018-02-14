/**
 * Banner component that goes across the top of the screen.
 */

import React from 'react';
import { Image } from 'react-bootstrap';

class Banner extends React.Component {
	render() {
		return (
			<div style={{
				display: 'flex',
				justifyContent: 'space-around',
				verticalAlign: 'top',
				minHeight: '100px',
				width: '100%',
				backgroundColor: 'black',
				overflow: 'hidden',
				margin: 'auto'
			}}><div style={{width: '50%'}}>
			<img style={{height: '100%', width: '100%', verticalAlign: 'top'}}
				src="../../static/images/splash.jpg" />
			</div></div>
		);
	}
}

export default Banner;
