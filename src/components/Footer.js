
/**
 * Component that lives on the bottom of the page in order 
 * to display copyright information ...
 */


import React from 'react';

class Footer extends React.Component {
	
	render() {
		return (
			<div style={{
				textAlign: 'center'
			}}>
				{'Copyright gameframe.online'}
			</div>
		);
	}
}

export default Footer;