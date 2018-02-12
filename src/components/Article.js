/**
 * Article is a generic page template for Articles.
 */

import React from 'react';
import { Link } from 'react-router-dom';

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
		};
	}
  
	render() {
		function renderPage (title, author, publish, thumbnailURL, summary, articleURL, 
		                     article, gameURL, game, developerURL, developer) {
			return (
				<div>
					<h1> Article: {title} </h1>
					<h2> Author: {author} </h2>
					<h2> Published: {publish} </h2>
					<div>
						<img width={300} height={300} src={thumbnailURL} />
						<div>
							<h2>Summary: </h2>
							<p> {summary} </p>
							<div>
								<h2>Read More: </h2>
								<a href={articleURL} target='_blank'><h3>{article}</h3></a>
								<div>
									<h2>Games: </h2>
									<Link to={gameURL}> {game} </Link>
									<div>
										<h2>Developer: </h2>
										<Link to={developerURL}> {developer} </Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		
		return (
			<div>
				{renderPage (this.props.title, this.props.author, this.props.publish, 
				             this.props.thumbnailURL, this.props.summary, this.props.articleURL, 
							 this.props.article, this.props.gameURL, this.props.game,
							 this.props.developerURL, this.props.developer)}
			</div>
		);
	}
}

export default Article;