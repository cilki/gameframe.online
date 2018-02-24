
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
		children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
		style: PropTypes.shape({
			container: PropTypes.object,
			border: PropTypes.object,
			jumboTron: PropTypes.object
		}).isRequired,

		twitterWidget: PropTypes.shape({
			widgetId: PropTypes.string,
			sourceType: PropTypes.string,
			screenName: PropTypes.string
		})
	}

	constructor() {
		super();
		this.state = {};
	}

	render() {
		let twitterProps = this.props.twitterWidget;

		return (
			<React.Fragment>
				<div style={this.props.style.container}></div>
	      <div style ={this.props.style.border}>
	        <Jumbotron style={this.props.style.jumboTron}>
	        	<div style={[InstanceDetailsStyles.container]}>
	          	<div style={[InstanceDetailsStyles.childContainer]}>
								{this.props.children}
							</div>

							<div style={[InstanceDetailsStyles.sidebarContainer]} >
								<InstanceSidebar twitterWidget={twitterProps} />
							</div>
						</div>
					</Jumbotron>
				</div>
			</React.Fragment>
		);
	}
}

export default Radium(InstanceDetails);