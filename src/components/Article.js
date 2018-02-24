/**
 * Article is a generic page template for Articles.
 */

import React from 'react';
import Radium from 'radium';
import {Jumbotron, Label, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Article as ArticleStyles } from '../inline-styles/ArticleStyles';

class Article extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      title: null,        /* Text */
      author: null,       /* Text */
      publish: null,      /* Text */
      thumbnailURL: null, /* http:// */
      summary: null,      /* Text: */
      articleURL: null,   /* http:// */
      article: null,      /* Text */
      gameURL: null,      /* http:// */
      game: null,         /* Text */
      developerURL: null, /* http:// */
      developer: null,    /* Text */
      hover1: false
    };
  }

  componentWillMount() {
    this.mouseEntry1 = this.mouseEntry1.bind(this);
    this.mouseLeave1 = this.mouseLeave1.bind(this);
  }

  mouseEntry1(e) {
    this.setState({hover1: true});
  }

  mouseLeave1(e) {
    this.setState({hover1: false});
  }

  render() {
    return (
      <div>
      <div style={{backgroundImage: 'url(' + this.props.image + ')',
        backgroundSize: 'cover',
        position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        filter: 'blur(64px)',
        zIndex: '-100',
        display: 'block',
        transform: 'scale(1.4)'}} />
        <div style = {[ArticleStyles.border]}>
          <Jumbotron style={[ArticleStyles.jumboTron], {borderRadius: '10px'}}>
            <h1 style={[ArticleStyles.title]}>{this.props.title}</h1>
            <div style={[ArticleStyles.secondaryInfo]}>
              <p>Author: {this.props.author}</p>
              <p>Published: {this.props.publish}</p>
            </div>
            <div style={[ArticleStyles.imageGallery]}>
              <div style={[
                ArticleStyles.imageContainer,
                this.state.hover1 && ArticleStyles.imageContainerHover
              ]}>
                <div onMouseEnter={this.mouseEntry1} onMouseLeave={this.mouseLeave1}>
                  <a href={this.props.image}>
                    <img style={[
                      ArticleStyles.image,
                      this.state.hover1 && ArticleStyles.imageHover
                    ]} src={this.props.image} />
                  </a>
                </div>
              </div>
            </div>
            <div style={[ArticleStyles.summary]}>
              <p dangerouslySetInnerHTML={{__html: this.props.summary}}></p>
	      <h3>Published by {this.props.publisher}</h3>
            </div>
            <div style={[ArticleStyles.games]}>
              <h3>Games:</h3><p><Link to={this.props.gameURL} tyle={{textDecoration: 'none'}}><Label>{this.props.game}</Label></Link></p>
            </div>
            <div style={[ArticleStyles.developer]}>
              <p>Developer: <Link to={this.props.developerURL} style={{textDecoration: 'none'}}><Label>{this.props.developer}</Label></Link></p>
            </div>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default Radium(Article);
