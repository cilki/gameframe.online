/**
 * Page is a generic template to show an instance of a model.
 */

import React from 'react';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			titleField: null,       /* Text: */
				title: null,        /* Text */
			imageURL: null,         /* http:// */
			dateField: null,        /* Text: */
				date: null,         /* Text */
			specialField: null,     /* Text: */
				special: null,      /* Text */
			descriptionField: null, /* Text: */
				description: null,  /* Text */
			modelAField: null,      /* Text: */
				modelAURL: null,    /* http:// */
				modelA: null,       /* Text */
			modelBField: null,      /* Text: */
				modelBURL: null,    /* http:// */
				modelB: null,       /* Text */
			mediaField: null,       /* Text: */
				mediaURL: null,     /* http:// */
				media: null         /* Text */
		};
	}
  
	render() {
		function renderPage (titleField, title, imageURL, dateField, date, 
		                     specialField, special, descriptionField, 
							 description, modelAField, modelAURL, modelA,
						     modelBField, modelBURL, modelB, mediaField, 
						     mediaURL, media) {
			return (
				<div>
					<h1> {titleField} {title} </h1>
					<div>
						<img src={imageURL} />
						<div>
							<h2> {dateField} {date} </h2>
							<h2> {specialField} {special} </h2>
							<div>
								<h2>{descriptionField} </h2>
								<p> {description} </p>
								<div>
									<h2>{modelAField} </h2>
									<a href={modelAURL}><h3>{modelA}</h3></a>
									<div>
										<h2>{modelBField} </h2>
										<a href={modelBURL}><h3>{modelB}</h3></a>
										<div>
											<h2>{mediaField} </h2>
											<a href={mediaURL}><h3>{media}</h3></a>
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
				{renderPage (this.props.titleField, this.props.title, this.props.imageURL, 
				             this.props.dateField, this.props.date, this.props.specialField, 
							 this.props.special, this.props.descriptionField, this.props.description,
							 this.props.modelAField, this.props.modelAURL, this.props.modelA,
							 this.props.modelBField, this.props.modelBURL, this.props.modelB,
							 this.props.mediaField, this.props.mediaURL, this.props.media)}
			</div>
		);
	}
}

export default Page;