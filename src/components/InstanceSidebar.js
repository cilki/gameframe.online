
/**
 * A sidebar component for instance pages
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import { InstanceSidebar as InstanceSidebarStyles } from '../inline-styles/InstanceSidebarStyles';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

class InstanceSidebar extends React.Component {
	static propTypes = {
		twitterWidget: PropTypes.string
	}

	constructor() {
		super();
		this.state = {};
	}

	render() {
		let twitterWidget = this.props.twitterWidget;

		return (
			<div style={[InstanceSidebarStyles.container]}>
				{twitterWidget && 
					<div>
						<h3>Twitter</h3>
						<TwitterTimelineEmbed sourceType='widget' widgetId={twitterWidget} />
					</div>
				}
			</div>
		);
	}
}

export default Radium(InstanceSidebar);