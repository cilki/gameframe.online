/**
 * ScrollStart is a basic class method that helps force the native
 * scrollbar to start at the beginning on every page, on every load.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class ScrollStart extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired, // eslint-disable-line
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  };

  static defaultProps = {
    children: null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0); // eslint-disable-line
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollStart);
