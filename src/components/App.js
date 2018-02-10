
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
//import Footer from './Footer';

class App extends React.Component {

	render() {
		return (
			<Router>
				<div style={{
					display: 'flex',
					minHeight: '100%',

					flexDirection: 'column'
				}}>
					<Banner />
					<Navbar />

					<div style={{
						flex: 1
					}}>
						<Route path="/" exact component={Splash} />
					</div>

					<div style={{
						display: 'flex',
						flexDirection: 'vertical'
					}}>
						<Route path="/games" component={InstanceGrid} />

					</div>

			{/*<Footer />*/}
				</div>
			</Router>
		);
	}
}

export default App;
