
/**
 * A component for a single group member in the about page
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Col, Thumbnail } from 'react-bootstrap';
import Styles from '../about/AboutStyles';

class GroupMember extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    bio: PropTypes.string,
    commits: PropTypes.number,
    login: PropTypes.string.isRequired, //eslint-disable-line
    name: PropTypes.string,
    issues: PropTypes.number,
    responsibilities: PropTypes.string,
    unitTests: PropTypes.number,

    fetchStats: PropTypes.func.isRequired,
  };

  static defaultProps = {
    avatar: null,
    bio: '',
    commits: 0,
    name: '',
    issues: 0,
    responsibilities: '',
    unitTests: 0,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description - React lifecycle method that should be
   * called whenever the component is mounted
   */
  componentDidMount() {
    this.props.fetchStats();
  }

  render() {
    return (
      <Col lg={4} md={6} sm={6}>
        <div style={[Styles.cardPad]}>
          <div style={[Styles.cardMember, Styles.cardExpand]} key={`${this.props.name}-card`}>
            <img src={this.props.avatar} style={[Styles.cardMemberImage]}/>
            <h3 style={[Styles.title]}>{this.props.name}</h3>
            <p style={[Styles.paragraph]}><strong>Bio: </strong>{this.props.bio}</p>
            <p style={[Styles.paragraph]}><strong>Responsibilities: </strong>{this.props.responsibilities}</p>
            <p style={[Styles.paragraph]}><strong>Commits: </strong>{this.props.commits}</p>
            <p style={[Styles.paragraph]}><strong>Issues: </strong>{this.props.issues}</p>
            <p style={[Styles.paragraph]}><strong>Unit Tests: </strong>{this.props.unitTests}</p>
          </div>
          <img src={"../../../static/images/arrowDown.svg"} style={[Styles.cardArrow]}/>
        </div>
      </Col>
    );
  }
}

export default Radium(GroupMember);
