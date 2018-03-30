import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import MinigridStyles from './MinigridStyles';

class Minigrid extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
  };

  static defaultProps = {

  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div style={[ MinigridStyles.main ]}>
        {this.props.children}
      </div>
    );
  }
}

export default Radium(Minigrid);
