import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import MinicardStyles from './MinicardStyles';

class Minicard extends React.Component {
  static propTypes = {
    label: PropTypes.any,//eslint-disable-line
    url: PropTypes.string,
    cover: PropTypes.string,
    cardKey: PropTypes.string,
  };

  static defaultProps = {
    label: 'Label Missing',
    url: '',
    cover: '../../../noImage.png',
    cardKey: `${Math.random() * 512}`,
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const label = this.props.label;
    const url = this.props.url;
    const cover = this.props.cover;
    const cardKey = this.props.cardKey;
    return (
      <Link key={cardKey} to={url} style={MinicardStyles.link}>
        <div key={`${cardKey}-minicard`} style={[MinicardStyles.minicard(cover)]}>
          <div style={[MinicardStyles.textArea]}>
            <p style={[MinicardStyles.paragraph]}>
              {label}
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

export default Radium(Minicard);
