
/**
 * Top level component for the entire application. Uses react router to 
 * provide static/dynamic routing
 */

import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import Navbar from './Navbar';
import Banner from './Banner';
import Splash from './Splash';

class App extends React.Component {

	render() {
		return (
			<Router>
				<div>
					<Banner />
					<Navbar />

					<div>
						<Route path="/" exact component={Splash} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;