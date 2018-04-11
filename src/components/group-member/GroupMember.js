
/**
 * A component for a single group member in the about page
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Col, Thumbnail } from 'react-bootstrap';
import Styles from '../about/AboutStyles';
import Minigrid from '../minigrid/Minigrid';
import Minicard from '../minicard/Minicard';

/**
 * @description - Helper method for rendering a link to a developer or article
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.url
 * @returns {React.Component}
 */
function link({
  label, url, cover, key,
}) {
  return (
    <div style={[Styles.favGamesContainer]} key={`${key}-container`}>
      <Minicard label={label} url={url} cover={cover} cardKey={`${key}-inner`} key={key} />
    </div>
  );
}

link.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  key: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
};

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
    favGames: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      cover: PropTypes.string,
    })),

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
    favGames: [],
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
            <img src={this.props.avatar} style={[Styles.cardMemberImage]} />
            <h3 style={[Styles.title]}>
              {this.props.name}
            </h3>
            <p style={[Styles.stats]}>
              {this.props.responsibilities}
            </p>
            <p style={[Styles.stats]}>
              {this.props.commits} Commits | {this.props.issues} Issues | {this.props.unitTests} Tests
            </p>
            <div>
              <h4 style={[Styles.favGamesTitle]}>
                <strong>Favorite Games</strong>
              </h4>
              <Minigrid>
                {
                  this.props.favGames.map(favGame => link({
                    label: favGame.name,
                    url: `/games/${favGame.id}`,
                    cover: favGame.cover,
                    key: `favGame-${favGame.id}`,
                  }))
                }
              </Minigrid>
            </div>
            <br />
            <p style={[Styles.stats]}>
              <strong>
                Biography
              </strong>
            </p>
            <p style={[Styles.paragraph]}>
              {this.props.bio}
            </p>
          </div>
          <img src="../../../static/images/arrowDown.svg" style={[Styles.cardArrow]} />
        </div>
      </Col>
    );
  }
}

export default Radium(GroupMember);
