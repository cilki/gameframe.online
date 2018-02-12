/**
 * Portal 2s Perpetual Testing Initiative Launching Page.
 *
 * Some information taken from:
 * https://www.giantbomb.com/articles/portal-2s-perpetual-testing-initiative-launching-m/1100-4107/
 */

import React from 'react';
import Article from './Article';

class Article2 extends React.Component {
	render() {
		return (
			<div>
				<Article title='Portal 2s Perpetual Testing Initiative Launching' 
					     author='Alex Navarro'
						 publish='April 26, 2012'
						 thumbnailURL=''
						 summary='For those not content with simply playing through the various puzzles in Portal 2 crafted by Valve, 
						          youre about to get a piece of news that should make you squeal with girlish glee.
                                  Valve today announced a new piece of DLC coming to Portal 2 on May 8, one designed to let players 
								  craft their own puzzles. The Perpetual Testing Initiative is a simplified puzzle maker that allows 
								  players to create their own puzzles and directly publish them to the Steam Workshop, where other 
								  players can download and rate them.
                                  The DLC will be a free download for PC and Mac users. Unfortunately, it doesnt look as though console 
								  players will be getting this content, though based on previous history, thats not too surprising.
                                  While I havent touched Portal 2 since the last DLC came and went, I have to admit the possibility of 
								  downloading some new user-made puzzles has me itching to fire the game back up again. And Im sure once 
								  the whole thing degenerates into people making nothing but cake-related joke levels, Ill stop again. 
								  But the time in-between should be fantastic.'
						 articleURL='https://www.giantbomb.com/articles/portal-2s-perpetual-testing-initiative-launching-m/1100-4107/' article='Click Here!'
						 gameURL='' game=''
						 developerURL='' developer=''
				/>
			</div>
		);
	}
}

export default Article2;