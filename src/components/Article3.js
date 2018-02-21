/**
 * V0.73 and release plans Page.
 *
 * Some information taken from:
 * http://steamcommunity.com/games/242760/announcements/detail/1652128002688763568
 */

import React from 'react';
import Article from './Article';

class Article3 extends React.Component {
  render() {
    return (
      <div>
        <Article
          title="The Forest launches this April, after four years lost in the woods"
          author="Dominic Tarason"
          publish="February 2, 2018"
          thumbnailURL=""
          summary={['<p></p>\n<p>Four years in early access, a highly active player-base and enough sales to make it a regular front-page bestsellers fixture on Steam,  <a href="https://www.rockpapershotgun.com/tag/the-forest/">The Forest</a> has done very well for itself, considering its lengthy public development cycle, and crowded genre.</p>\n<p>While not <em>quite</em> as ambitious as the excellent (and recently finalized) Subnautica, The Forest puts its own narrative-driven, oft-horrific spin on the survival sandbox genre. Development on the game has shifted gears in recent months, and developers <a href="http://survivetheforest.com/2018/02/v0-73-and-release-plans/">Endnight Games are  planning for it  to leave Early Access this April</a>, accompanied by one massive final update.</p>\n<p> <a href="https://www.rockpapershotgun.com/2018/02/02/the-forest-launches-this-april-after-four-years-lost-in-the-woods/#more-513431" class="more-link">(more&hellip;)</a></p>\n']}
          articleURL="http://steamcommunity.com/games/242760/announcements/detail/1652128002688763568"
          article="Click Here!"
          gameURL="/TheForest"
          game="The Forest"
          developerURL="/EndnightGamesLtd"
          developer="Endnight Games Ltd."
          image="https://assets.rockpapershotgun.com/images//2018/02/ss_e50b7c8bc2f4720859ba13aa32703661192f4d62.1920x1080-620x300.jpg"
          publisher="Rock Paper Shotgun"
        />
      </div>
    );
  }
}

export default Article3;
