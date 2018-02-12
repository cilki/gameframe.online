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
					       about='Not Available.'
					       gameURL='' game=''
					       articleURL='' article=''
					       twitterURL='' twitter=''
				/>
			</div>
		);
	}
}

export default ValveCorporation;