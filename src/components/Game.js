/**
 * Game is a generic page template for Games.
 */

import React from 'react';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			game: null,         /* Text */
			image1URL: null,    /* http:// */
			image2URL: null,    /* http:// */
			image3URL: null,    /* http:// */
			release: null,      /* Text: */
			genre: null,        /* Text */
			synoposis: null,    /* Text */
			developerURL: null, /* http:// */
			developer: null,    /* Text */
			articleURL: null,   /* http:// */
			article: null,      /* Text */
			twitterURL: null,   /* http:// */
			twitter: null,      /* Text */
			youtubeURL: null,   /* http:// */
			youtube: null,      /* Text */
			twitchURL: null,    /* http:// */
			twitch: null        /* Text */
		};
	}
  
	render() {
		function renderPage (game, image1URL, image2URL, image3URL, release, genre, 
		                     synoposis, developerURL, developer, articleURL, article, 
							 twitterURL, twitter, youtubeURL, youtube, twitchURL, twitch) {
			return (
				<div>
					<h1> Game: {game} </h1>
					<div>
						<img src={image1URL} />
						<img src={image2URL} />
						<img src={image3URL} />
						<div>
							<h2> Released: {release} </h2>
							<h2> Genre: {genre} </h2>
							<div>
								<h2>Synoposis: </h2>
								<p> {synoposis} </p>
								<div>
									<h2>Developer: </h2>
									<a href={developerURL}><h3>{developer}</h3></a>
									<div>
										<h2>Articles: </h2>
										<a href={articleURL}><h3>{article}</h3></a>
										<div>
											<h2>Twitter: </h2>
											<a href={twitterURL}><h3>{twitter}</h3></a>
											<h2>YouTube: </h2>
											<a href={youtubeURL}><h3>{youtube}</h3></a>
											<h2>Twitch: </h2>
											<a href={twitchURL}><h3>{twitch}</h3></a>
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
				{renderPage (this.props.game, this.props.image1URL, this.props.image2URL, 
				             this.props.image3URL, this.props.release, this.props.genre, 
							 this.props.synoposis, this.props.developerURL, this.props.developer,
							 this.props.articleURL, this.props.article, this.props.twitterURL,
							 this.props.twitter, this.props.youtubeURL, this.props.twitchURL,
							 this.props.twitch)}
			</div>
		);
	}
}

export default Game;