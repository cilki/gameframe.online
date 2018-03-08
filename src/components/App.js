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

import Games, { reducer as GamesReducer } from './games';
import Portal2 from './Portal2';
import PLAYERUNKNOWNSBATTLEGROUNDS from './PLAYERUNKNOWNSBATTLEGROUNDS';
import RocketLeague from './RocketLeague';
import TheForest from './TheForest';

import Developers, { reducer as DevelopersReducer } from './developers';
import ValveCorporation from './ValveCorporation';
import PUBGCorp from './PUBGCorp';
import Psyonix from './Psyonix';
import EndnightGamesLtd from './EndnightGamesLtd';

import Articles, { reducer as ArticlesReducer } from './articles';
import Article1 from './Article1';
import Article2 from './Article2';
import Article3 from './Article3';
import Article4 from './Article4';

import AboutPage, { reducer as AboutReducer } from './about';

const store = createStore(
  combineReducers({
    about: AboutReducer,
    games: GamesReducer,
  	developers: DevelopersReducer,
  	articles: ArticlesReducer,
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
                   background:
"radial-gradient(circle farthest-side at 0% 50%,#fb1 23.5%,rgba(240,166,17,0) 0)21px 30px, radial-gradient(circle farthest-side at 0% 50%,#B71 24%,rgba(240,166,17,0) 0)19px 30px, linear-gradient(#fb1 14%,rgba(240,166,17,0) 0, rgba(240,166,17,0) 85%,#fb1 0)0 0, linear-gradient(150deg,#fb1 24%,#B71 0,#B71 26%,rgba(240,166,17,0) 0,rgba(240,166,17,0) 74%,#B71 0,#B71 76%,#fb1 0)0 0, linear-gradient(30deg,#fb1 24%,#B71 0,#B71 26%,rgba(240,166,17,0) 0,rgba(240,166,17,0) 74%,#B71 0,#B71 76%,#fb1 0)0 0, linear-gradient(90deg,#B71 2%,#fb1 0,#fb1 98%,#B71 0%)0 0 #fb1",
              
backgroundSize:"40px 60px"
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
