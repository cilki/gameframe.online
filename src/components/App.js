/**
 * Top level component for the entire application. Uses react router to
 * provide static/dynamic routing
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import Banner from './Banner';
import Navbar from './Navbar';
import Splash from './Splash';
import Footer from './Footer';

import Games from './Games';
import Portal2 from './Portal2';
import PLAYERUNKNOWNSBATTLEGROUNDS from './PLAYERUNKNOWNSBATTLEGROUNDS';
import RocketLeague from './RocketLeague';
import TheForest from './TheForest';

import Developers from './Developers';
import ValveCorporation from './ValveCorporation';
import PUBGCorp from './PUBGCorp';
import Psyonix from './Psyonix';
import EndnightGamesLtd from './EndnightGamesLtd';

import Articles from './Articles';
import Article1 from './Article1';
import Article2 from './Article2';
import Article3 from './Article3';
import Article4 from './Article4';

import AboutPage, { reducer as AboutReducer } from './about';

const store = createStore(
  combineReducers({
    about: AboutReducer,
  }),
  applyMiddleware(
    thunkMiddleware
  )
);

/**
 * Since we'll likely be unit testing this code, we can't assume the
 * existence of a 'window' object
 */
try {
  window.store = store;
}
catch (error) {
  // do nothing...
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{
  					display: 'flex',
  					minHeight: '100%',
  					flexDirection: 'column',
  				}}
          >
            <Banner />
            <Navbar />

            <div style={{
  						flex: 1,
  						verticalAlign: 'top',
  					}}
            >
              <Route path="/" exact component={Splash} />
              <Route path="/about" component={AboutPage} />
              <Route path="/games" exact component={Games} />
              <Route path="/developers" exact component={Developers} />
              <Route path="/articles" exact component={Articles} />

              <Route path="/Portal2" exact component={Portal2} />
              <Route path="/PLAYERUNKNOWNSBATTLEGROUNDS" component={PLAYERUNKNOWNSBATTLEGROUNDS} />
              <Route path="/RocketLeague" component={RocketLeague} />
              <Route path="/TheForest" component={TheForest} />

              <Route path="/ValveCorporation" exact component={ValveCorporation} />
              <Route path="/PUBGCorp" exact component={PUBGCorp} />
              <Route path="/Psyonix" exact component={Psyonix} />
              <Route path="/EndnightGamesLtd" exact component={EndnightGamesLtd} />

              <Route path="/Article1" exact component={Article1} />
              <Route path="/Article2" exact component={Article2} />
              <Route path="/Article3" exact component={Article3} />
              <Route path="/Article4" exact component={Article4} />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
