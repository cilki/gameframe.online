/**
 * Endnight Games Ltd Page.
 *
 * Some information taken from:
 * https://www.igdb.com/companies/endnight-games-ltd
 */

import React from 'react';
import Developer from './Developer';

class EndnightGamesLtd extends React.Component {
	render() {
		return (
			<div>
				<Developer developer='Endnight Games Ltd.' 
					       logoURL='https://www.giantbomb.com/images/1300-2569978'
				           year='2014'
					       loc='Not Available.' 
					       about='Not Available.'
					       gameURL='' game=''
					       articleURL='' article=''
					       twitterURL='' twitter=''
				/>
			</div>
		);
	}
}

export default EndnightGamesLtd;