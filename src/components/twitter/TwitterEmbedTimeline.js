
/**
 * Pulled from https://github.com/saurabhnemade/react-twitter-embed/blob/master/src/components/TwitterTimelineEmbed.js
 * Written by Github User saurabhnemade (https://github.com/saurabhnemade)
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Load in Twitter's custom widget code
require('./Widget.js');

export default class TwitterTimelineEmbed extends Component {
  static propTypes = {
    /**
         * This can be either of profile, likes, list, collection, URL, widget
         */
    sourceType: PropTypes.oneOf(['profile', 'likes', 'list', 'collection', 'URL', 'widget']).isRequired,
    /**
         * username of twitter handle as String
         */
    screenName: PropTypes.string,
    /**
         * UserId of twitter handle as number
         */
    userId: PropTypes.number,
    /**
         * To show list, used along with slug
         */
    ownerScreenName: PropTypes.string,
    /**
         * To show list, used along with ownerScreenName
         */
    slug: PropTypes.string,
    /**
         * To show list, unique list id
         * Also used with collections, in that case its valid collection id
         */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
         * To show twitter content with url.
         * Supported content includes profiles, likes, lists, and collections.
         */
    url: PropTypes.string,
    /**
         * To show custom widget
         */
    widgetId: PropTypes.string,
    /**
         * Additional options to pass to twitter widget plugin
         */
    options: PropTypes.object,
    /**
         * Automatically fit into parent container height
         */
    autoHeight: PropTypes.bool,
  };

  componentDidMount() {
    if (!window.twttr) {
      console.error('Failure to load window.twttr, aborting load.');
      return;
    }

    const options = Object.assign({}, this.props.options);

    if (this.props.autoHeight) {
      options.height = this.refs.embedContainer.parentNode.offsetHeight;
    }

    window.twttr.widgets.createTimeline(
      {
        sourceType: this.props.sourceType,
        screenName: this.props.screenName,
        userId: this.props.userId,
        ownerScreenName: this.props.ownerScreenName,
        slug: this.props.slug,
        id: this.props.id,
        url: this.props.url,
        widgetId: this.props.widgetId,
      },
      this.refs.embedContainer,
      options,
    );
  }

  render() {
    return (
      <div ref="embedContainer" />
    );
  }
}
