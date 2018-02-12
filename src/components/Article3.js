/**
 * V0.73 and release plans Page.
 *
 * Some information taken from:
 * http://steamcommunity.com/games/242760/announcements/detail/1652128002688763568
 */

import React from 'react';
import Article from './Article';

class Article3 extends React.Component {
	render() {
		return (
			<div>
				<Article title='V0.73 and release plans' 
					     author='DISHMINK'
						 publish='February 1, 2017'
						 thumbnailURL=''
						 summary='Hey Everyone, We wanted to share our plans for moving The Forest out of early access and into a full v1.0 release. 
						          Were aiming for a release date towards the end of April. Well have an exact date when we are a bit closer. On release 
								  of v1.0 the price will increase from $14.99 USD to $19.99 USD'
						 articleURL='http://steamcommunity.com/games/242760/announcements/detail/1652128002688763568' article='Click Here!'
						 gameURL='/TheForest' game='The Forest'
						 developerURL='/EndnightGamesLtd' developer='Endnight Games Ltd.'
				/>
			</div>
		);
	}
}

export default Article3;