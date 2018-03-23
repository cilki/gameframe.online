
/**
 * A sidebar component for instance pages
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import InstanceSidebarStyles from '../inline-styles/InstanceSidebarStyles';
import TwitterTimelineEmbed from './twitter/TwitterEmbedTimeline';

class InstanceSidebar extends React.Component {
  static propTypes = {
    twitterWidget: PropTypes.object, //eslint-disable-line
  }

  static defaultProps = {
    twitterWidget: {},
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const twitterProps = Object.assign({}, this.props.twitterWidget);

    if (twitterProps.widgetId) { twitterProps.sourceType = 'widget'; }

    return (
      <div style={[InstanceSidebarStyles.container]}>
        {
          Object.keys(twitterProps).length > 0 &&
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
