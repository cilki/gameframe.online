/**
 * Valve Corporation Page.
 */

import React from 'react';
import Page from './Page';

class ValveCorporation extends React.Component {
	render() {
		return (
			<div>
				<Page titleField='Developer: ' title='Valve Corporation' 
					  imageURL='https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png'
				      dateField='Established: ' date='1996'
					  specialField='Country: ' special='USA' 
					  descriptionField='Description: ' 
					  description='Not Available.'
					  modelAField='Games: ' modelAURL='' modelA=''
					  modelBField='Articles: ' modelBURL='' modelB=''
					  mediaField='Twitter: ' mediaURL='' media=''
				/>
			</div>
		);
	}
}

export default ValveCorporation;