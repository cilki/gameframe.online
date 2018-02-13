/**
 * Psyonix Page.
 *
 * Some information taken from:
 * https://www.igdb.com/companies/psyonix
 */

import React from 'react';
import Developer from './Developer';

class Psyonix extends React.Component {
	render() {
		return (
			<div>
				<Developer developer='Psyonix' 
					       logoURL='https://images.igdb.com/igdb/image/upload/t_logo_med/iosg1iatkemmtzdlu3zf.png'
				           year='2000'
					       loc='United States' 
					       about='Psyonix is an American video game development studio based in San Diego, California. 
						          The company focuses on its own development, as well as contributing to larger companies 
								  and publishers utilizing the Unreal Engine. Psyonix was founded in the year 2000 by Dave 
								  Hagewood, after developing Internet and multimedia software under the name WebSite 
								  Machines. Its first game project was Proteus.'
					       gameURL='/RocketLeague' game='Rocket League'
					       articleURL='/Article3' article='Rocket League Roadmap: Spring 2018'
					       twitterURL='' twitter=''
				/>
			</div>
		);
	}
}

export default Psyonix;