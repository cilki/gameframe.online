/**
 * Developer is a generic page template for Developers.
 */

import React from 'react';
import Radium from 'radium';
import {Jumbotron, Label, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Developer as DeveloperStyles } from '../inline-styles/DeveloperStyles';
import Card from './Card';

class Developer extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    developer: null,  /* Text */
    logoURL: null,    /* http:// */
    year: null,       /* Text: */
    loc: null,    /* Text */
    about: null,      /* Text */
    gameURL: null,    /* http:// */
    game: null,       /* Text */
      articleURL: null, /* http:// */
      article: null,    /* Text */
      twitterURL: null, /* http:// */
      twitter: null     /* Text */
    };
  }

  render() {
    return (
      <div style = {[DeveloperStyles.border]}>
        <Jumbotron style={[DeveloperStyles.jumboTron], {borderRadius: '10px'}}>
          <h1 style={[DeveloperStyles.name]}>{this.props.developer}</h1>
          <div style={[DeveloperStyles.secondaryInfo]}>
            <p>Established: {this.props.year}</p>
            <p>Location: {this.props.loc}</p>
          </div>

          <div style={[DeveloperStyles.about]}>
            <p>{this.props.about}</p>
          </div>
          <div style={[DeveloperStyles.games]}>
            <h3>Games:</h3><p><Link to={this.props.gameURL} style={{textDecoration: 'none'}}><Label>{this.props.game}</Label></Link></p>
          </div>
          <div style={[DeveloperStyles.articles]}>
            <h3>Articles:</h3><p><Link to={this.props.articleURL} style={{textDecoration: 'none'}}><Label>{this.props.article}</Label></Link></p>
          </div>
          <div style={[DeveloperStyles.twitter]}>
            <h3>Twitter:</h3>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default Radium(Developer);
