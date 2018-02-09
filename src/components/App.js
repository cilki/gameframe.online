
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
import InstanceGrid from './InstanceGrid';

class App extends React.Component {

	render() {
		return (
			<Router>
				<div style={{
					display: 'flex'
				}}>
					<Banner />
					<Navbar />

					<div style={{
						flex: 1,
						flexDirection: 'vertical'
					}}>
						<Route path="/" exact component={Splash} />

						{<Route path="/games" component={InstanceGrid} />}

					</div>

				{/* <Footer /> */}
				</div>
			</Router>
		);
	}
}

export default App;
