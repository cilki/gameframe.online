/**
 * ScrollStart is a basic class method that helps force the native
 * scrollbar to start at the beginning on every page, on every load.
 */

import React from 'react';
import { withRouter } from 'react-router';

class ScrollStart extends React.Component { /* eslint-disable */
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollStart);
