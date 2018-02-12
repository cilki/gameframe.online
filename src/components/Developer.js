/**
 * Page is a generic template to show an instance of a model.
 */

import React from 'react';
import Page from './Page';

class ValveCorporation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			titleField: null,       /* Text: */
				title: null,        /* Text */
			imageURL: null,         /* http:// */
			dateField: null,        /* Text: */
				date: null,         /* #### */
			specialField: null,     /* Text: */
				special: null,      /* Text */
			descriptionField: null, /* Text: */
				description: null,  /* Text */
			modelAField: null,      /* Text: */
				modelAURL: null,    /* http:// */
			modelBField: null,      /* Text: */
				modelBURL: null,    /* http:// */
			mediaField: null,       /* Text: */
				mediaURL: null      /* http:// */
		};
	}
  
	render() {
			return (
				{renderPage (this.props.titleField, this.props.title, this.props.imageURL, 
				             this.props.dateField, this.props.date, this.props.specialField, 
							 this.props.special, this.props.descriptionField, this.props.description,
							 this.props.modelAField, this.props.modelAURL, this.props.modelA,
							 this.props.modelBField, this.props.modelBURL, this.props.modelB,
							 this.props.mediaField, this.props.mediaURL, this.props.media)}
			);
		}
		
		return (
			<div>
				{renderDeveloper ('Developer: ', 'Valve Corporation', 'https://images.igdb.com/igdb/image/upload/t_logo_med/npiqdrnewkgshegnkca4.png', 1996, 'USA', '', 'https://github.com/cilki/gameframe.online')}
			</div>
		);
	}
}

export default Developer;