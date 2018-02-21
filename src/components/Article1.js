/**
 * Portal 2s Perpetual Testing Initiative Launching Page.
 *
 * Some information taken from:
 * https://www.giantbomb.com/articles/portal-2s-perpetual-testing-initiative-launching-m/1100-4107/
 */

import React from 'react';
import Article from './Article';

class Article1 extends React.Component {
  render() {
    return (
      <div>
        <Article
          title="Bridge Constructor Portal isnt a rollercoaster of laughs, but its still good"
          author="Brendan Caldwell"
          publish="January 10, 2018"
          thumbnailURL=""
          summary={['<p></p>\n<p>It&#8217;s not the <a href="https://www.rockpapershotgun.com/tag/portal/">Portal</a> follow-up we were expecting, but it&#8217;s the one we got. <a href="https://www.rockpapershotgun.com/tag/bridge-constructor-portal/">Bridge Constructor Portal</a> is a crossover between Valve   s comedy science puzzler and the strut-straddling engineering of the Bridge Constructor series. You   re still making bridges that wobble from A to B, and sending small vehicles across your creations. However, you also have the distraction of portals, turrets, proulsion gel and catapults, as well as a passive aggressive computer that passes judgement on your techniques. It feels fruitless to review such a straightforward cocktail &#8211; it&#8217;s two flavours you may already know so let&#8217;s just see how they blend together. And the opening chapters are reassuring. This is a decent wee nugget of a puzzler. <a href="https://www.rockpapershotgun.com/2018/01/10/bridge-constructor-portal-review/#more-507017" class="more-link">(more&hellip;)</a></p>\n']}
          articleURL="https://www.giantbomb.com/articles/portal-2s-perpetual-testing-initiative-launching-m/1100-4107/"
          article="Click Here!"
          gameURL="/Portal2"
          game="Portal 2"
          developerURL="/ValveCorporation"
          developer="Valve Software"
          image="https://assets.rockpapershotgun.com/images//2018/01/portal-bridge-2-620x300.jpg"
          publisher="Rock Paper Shotgun"
        />
      </div>
    );
  }
}

export default Article1;
