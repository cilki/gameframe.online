
/**
 * A sidebar component for instance pages
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import { InstanceSidebar as InstanceSidebarStyles } from '../inline-styles/InstanceSidebarStyles';
import TwitterTimelineEmbed from './twitter/TwitterEmbedTimeline';

class InstanceSidebar extends React.Component {
	static propTypes = {
		twitterWidget: PropTypes.object
	}

	constructor() {
		super();
		this.state = {};
	}

	render() {
		let twitterProps = Object.assign({}, this.props.twitterWidget);
		
		if (twitterProps.widgetId)
			twitterProps.sourceType = 'widget';


		return (
			<div style={[InstanceSidebarStyles.container]}>
				{Object.keys(twitterProps).length > 0 && 
					<div>
						<h3>Twitter</h3>
						<TwitterTimelineEmbed {...twitterProps} />
					</div>
				}
			</div>
		);
	}
}

export default Radium(InstanceSidebar);