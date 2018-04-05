import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Jumbotron } from 'react-bootstrap';

import InstanceDetailsStyles from './InstanceDetailsStyles';
import CommonAssets from '../../inline-styles/CommonAssets';

class InstanceDetails extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
    imageURL: PropTypes.oneOfType([PropTypes.string]),
  };

  static defaultProps = {
    imageURL: '../../../static/images/noImage.png',
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const imageURL = this.props.imageURL;
    return (
      <React.Fragment>
        <div style={[InstanceDetailsStyles.main]}>
          <div style={[
            CommonAssets.stripeOverlay,
            CommonAssets.fillBackground,
          ]}
          />
          <div style={[InstanceDetailsStyles.blurBackgroundBefore]}>
            <img
              src={imageURL}
              style={[InstanceDetailsStyles.blurBackgroundImage]}
              alt=""
            />
          </div>
          <div style={[InstanceDetailsStyles.backgroundBorder]}>
            <Jumbotron style={InstanceDetailsStyles.jumbotron}>
              {this.props.children}
            </Jumbotron>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Radium(InstanceDetails);
