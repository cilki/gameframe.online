/**
 * Top level component for the entire application. Uses react router to
 * provide static/dynamic routing
 */

import React from 'react';
import Radium from 'radium';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import Banner from './Banner';
import Navbar, { reducer as NavbarReducer } from './navbar';
import Splash from './Splash';
import Footer from './Footer';

import Games, { reducer as GamesReducer } from './games';
import Game from './game';

import Developers, { reducer as DevelopersReducer } from './developers';
import Developer from './developer';

import Articles, { reducer as ArticlesReducer } from './articles';
import Article from './article';

import SearchResults from './SearchResults';

import AboutPage, { reducer as AboutReducer } from './about';

import ScrollStart from './ScrollStart';

import { Helmet } from 'react-helmet';

const store = createStore(
  combineReducers({
    navbar: NavbarReducer,
    about: AboutReducer,
    games: GamesReducer,
    developers: DevelopersReducer,
    articles: ArticlesReducer,
  }),
  applyMiddleware(thunkMiddleware),
);

/**
 * Since we'll likely be unit testing this code, we can't assume the
 * existence of a 'window' object
 */
try {
  window.store = store; //eslint-disable-line
} catch (error) {
  // do nothing...
}

function App() {
  return (
    <Provider store={store}>
      <Router>
      <ScrollStart>
        <div style={[
            { display: 'flex' },
            { minHeight: '100%' },
            { flexDirection: 'column' },
        ]}
        >
          <Helmet>
            <title>GameFrame.online</title>
          </Helmet>
          <Route path="/" exact component={Banner} />
          <Route path="/about" exact component={Banner} />
          <Navbar />

          <div style={{
            flex: '1',
            verticalAlign: 'top',
            minHeight: '100%',
          }}
          >
            <Route path="/" exact component={Splash} />
            <Route path="/about" component={AboutPage} />

            <Route path="/games/:gameId" component={Game} />
            <Route path="/games" exact component={Games} />

            <Route path="/developers/:developerId" exact component={Developer} />
            <Route path="/developers" exact component={Developers} />

            <Route path="/articles/:articleId" component={Article} />
            <Route path="/articles" exact component={Articles} />

            <Route path="/search" component={SearchResults} />

          </div>

          <Footer />
        </div>
      </ScrollStart>
      </Router>
    </Provider>
  );
}

export default Radium(App);
