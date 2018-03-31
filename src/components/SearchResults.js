import React from 'react';
import Radium from 'radium';

import CommonAssets from '../inline-styles/CommonAssets';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query_string: decodeURI(window.location.href.substring(window.location.href.lastIndexOf('=') + 1)),//eslint-disable-line
      game_results: {},
      developer_results: {},
      article_results: {},
      // video_results: {},
      // twitter_results {},
    };
    this.updateGameItems = this.updateGameItems.bind(this);
    this.updateDeveloperItems = this.updateDeveloperItems.bind(this);
    this.updateArticleItems = this.updateArticleItems.bind(this);
    this.updateGameItems();
    this.updateDeveloperItems();
    this.updateArticleItems();
  }

  componentDidUpdate() {
    const newString = decodeURI(window.location.href.substring(window.location.href.lastIndexOf('=') + 1));//eslint-disable-line
    if (newString !== this.state.query_string) {
      this.state.query_string = newString;
      this.updateGameItems();
      this.updateDeveloperItems();
      this.updateArticleItems();
    }
  }

  updateGameItems() {
    fetch(//eslint-disable-line
      encodeURI('http://api.gameframe.online/v1/game?q={"filters":[{"name":"name","op":"like","val":"%' + this.state.query_string + '%"}]}'),
      { method: 'GET' },
    )
      .then(response => response.json())
      .then((data) => {
        this.setState({ game_results: data });
      });
  }

  updateDeveloperItems() {
    fetch(//eslint-disable-line
      encodeURI('http://api.gameframe.online/v1/developer?q={"filters":[{"name":"name","op":"like","val":"%' + this.state.query_string + '%"}]}'),
      { method: 'GET' },
    )
      .then(response => response.json())
      .then((data) => {
        this.setState({ developer_results: data });
      });
  }

  updateArticleItems() {
    fetch(//eslint-disable-line
      encodeURI('http://api.gameframe.online/v1/article?q={"filters":[{"name":"title","op":"like","val":"%' + this.state.query_string + '%"}]}'),
      { method: 'GET' },
    )
      .then(response => response.json())
      .then((data) => {
        this.setState({ article_results: data });
      });
  }

  render() {
    const query = this.state.query_string || '';
    // For highlighting
    const searchWords = query ? query.split(' ') : [];
    return (
      <div>
        <div style={[
          CommonAssets.fillBackground,
          CommonAssets.horizontalGradient,
        ]}
        />
        <div style={[
          CommonAssets.stripeOverlay,
          CommonAssets.fillBackground,
        ]}
        />
        <div>
          <h2>Game Results:</h2>
          {/* mini-grid for games */}
          <h2>Developer Results:</h2>
          {/* mini-grid for developers */}
          <h2>Article Results:</h2>
          {/* mini-grid for articles */}
        </div>
      </div>
    );
  }
}

export default Radium(SearchResults);
