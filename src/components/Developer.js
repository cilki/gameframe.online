/**
 * Developer is a generic page template for Developers.
 */

import React from 'react';

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
		function renderPage (developer, logoURL, year, loc, about, gameURL, 
		                     game, articleURL, article, twitterURL, twitter) {
			return (
				<div>
					<h1> Developer: {developer} </h1>
					<div>
						<img src={logoURL} />
						<div>
							<h2> Established: {year} </h2>
							<h2> Location: {loc} </h2>
							<div>
								<h2>About: </h2>
								<p> {about} </p>
								<div>
									<h2>Games: </h2>
									<a href={gameURL}><h3>{game}</h3></a>
									<div>
										<h2>Articles: </h2>
										<a href={articleURL}><h3>{article}</h3></a>
										<div>
											<h2>Twitter: </h2>
											<a href={twitterURL}><h3>{twitter}</h3></a>
										</div>
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
				{renderPage (this.props.developer, this.props.logoURL, this.props.year, 
				             this.props.loc, this.props.about, this.props.gameURL, 
							 this.props.game, this.props.articleURL, this.props.article,
							 this.props.twitterURL, this.props.twitter)}
			</div>
		);
	}
}

export default Developer;