/**
 * Article is a generic page template for Articles.
 */

import React from 'react';

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
						<img src={thumbnailURL} />
						<div>
							<h2>Summary: </h2>
							<p> {summary} </p>
							<div>
								<h2>Read More: </h2>
								<a href={articleURL}><h3>{article}</h3></a>
								<div>
									<h2>Games: </h2>
									<a href={gameURL}><h3>{game}</h3></a>
									<div>
										<h2>Developer: </h2>
										<a href={DeveloperURL}><h3>{Developer}</h3></a>
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