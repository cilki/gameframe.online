/**
 * Valve Corporation Page.
 *
 * Some information taken from:
 * https://www.igdb.com/companies/valve-corporation
 */

import React from 'react';
import Developer from './Developer';

class ValveCorporation extends React.Component {
	render() {
		return (
			<div>
				<Developer developer='Valve Corporation' 
					       logoURL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
				           year='1996'
					       loc='Washington, United States' 
					       about='Valve Corporation is an American video game developer and digital distribution company headquartered in Bellevue, Washington. The company is known for its software distribution platform Steam and the Half-Life, Counter-Strike, Portal, Day of Defeat, Team Fortress, Left 4 Dead, and Dota 2 games.'
					       gameURL='/Portal2' game='Portal 2'
					       articleURL='/Article1' article='Bridge Constructor Portal isnt a rollercoaster of laughs, but its still good'
					       twitterURL='' twitter={{widgetId: '964020375020621824'}}
				/>
			</div>
		);
	}
}

export default ValveCorporation;
