/**
 * Will Smith's Top 7 Games of 2017 Page.
 *
 * Some information taken from:
 * https://www.giantbomb.com/articles/will-smiths-top-7-games-of-2017/1100-5693/
 */

import React from 'react';
import Article from './Article';

class Article2 extends React.Component {
  render() {
    return (
      <div>
        <Article
          title="Will Smiths Top 7 Games of 2017"
          author="Giant Bomb Staff"
          publish="December 26, 2017"
          thumbnailURL=""
          summary={['It turns out, I really enjoy hunting people for sport. At a time when I thought I was officially done playing competitive online shooters, PlayerUnknowns Battlegrounds arrived and proved me wrong. <a href=\"https:\/\/www.giantbomb.com\/articles\/will-smiths-top-7-games-of-2017\/1100-5693\/\">Click here!</a>']}
          articleURL="https://www.giantbomb.com/articles/will-smiths-top-7-games-of-2017/1100-5693/"
          article="Click Here!"
          gameURL="/PLAYERUNKNOWNSBATTLEGROUNDS"
          game="PLAYERUNKNOWNS BATTLEGROUNDS"
          developerURL="/PUBGCorp"
          developer="PUBG Corp"
          publisher="Giant Bomb"
          image="https://static.giantbomb.com/uploads/original/0/39/2985782-maxresdefault+%2833%29.jpg"
        />
      </div>
    );
  }
}

export default Article2;
