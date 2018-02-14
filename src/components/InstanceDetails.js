
/**
 * Higher level component for any instance's individual page
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Jumbotron } from 'react-bootstrap';

import InstanceSidebar from './InstanceSidebar';
import { InstanceDetails as InstanceDetailsStyles } from '../inline-styles/InstanceDetailsStyles';

class InstanceDetails extends React.Component {
	/* Enumerate the required props in an attempt to reduce bugs */
	static propTypes = {
		children: PropTypes.element.isRequired,
		style: PropTypes.shape({
			container: PropTypes.object,
			border: PropTypes.object,
			jumboTron: PropTypes.object
		}).isRequired,

		twitterWidget: PropTypes.string
	}

	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<React.Fragment>
				<div style={this.props.style.container}></div>
	      <div style ={this.props.style.border}>
	        <Jumbotron style={this.props.style.jumboTron}>
	        	<div style={[InstanceDetailsStyles.container]}>
	          	<div style={[InstanceDetails.childContainer]}>
								{this.props.children}
							</div>

							<div style={[InstanceDetailsStyles.sidebarContainer]} >
								<InstanceSidebar twitterWidget={this.props.twitterWidget} />
							</div>
						</div>
					</Jumbotron>
				</div>
			</React.Fragment>
		);
	}
}

export default Radium(InstanceDetails);