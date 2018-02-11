
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
import Developers from './Developers';
import Articles from './Articles';
import AboutPage from './About';
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

					<Route path="/about" component={AboutPage} />

					<div style={{
						display: 'flex',
						flexDirection: 'vertical'
					}}>
						<Route path="/games" exact component={InstanceGrid} />
					</div>
					
					<div style={{
						display: 'flex',
						flexDirection: 'vertical'
					}}>
						<Route path="/developers" exact component={Developers} />
					</div>
					
					<div style={{
						display: 'flex',
						flexDirection: 'vertical'
					}}>
						<Route path="/articles" exact component={Articles} />
					</div>

			{/*<Footer />*/}
				</div>
			</Router>
		);
	}
}

export default App;
