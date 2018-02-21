/**
 * Rocket League Roadmap: Spring 2018 Page.
 *
 * Some information taken from:
 * http://steamcommunity.com/games/252950/announcements/detail/1675771900733255728
 */

import React from 'react';
import Article from './Article';

class Article4 extends React.Component {
  render() {
    return (
      <div>
        <Article
          title="Rocket League Roadmap: Spring 2018"
          author="Corey Davis"
          publish="January 31, 2018"
          thumbnailURL="https://i.imgur.com/bR8e9SE.jpg"
          summary="Hi everybody! With our next update fast approaching, we wanted to share with you some of our plans for the first few months of 2018.
						          Were testing out a new update schedule this year that alternates Content Updates - which include things like new Competitive Seasons
								  (and rewards), Maps, Events, and DLC - with Feature Updates that focus on new functionality like Tournaments or Cross-Platform Parties."
          articleURL="http://steamcommunity.com/games/252950/announcements/detail/1675771900733255728"
          article="Click Here!"
          gameURL="/RocketLeague"
          game="Rocket League"
          developerURL="/Psyonix"
          developer="Psyonix"
          publisher="Psyonix"
          image="https://rocketleague.media.zestyio.com/rl_generic_screen_5_18_1920x1080.c6e1dc555a6eff57c623d9877706c9a5.jpg"
        />
      </div>
    );
  }
}

export default Article4;
