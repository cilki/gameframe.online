/**
 * Endnight Games Ltd Page.
 *
 * Some information taken from:
 * https://www.igdb.com/companies/endnight-games-ltd
 */

import React from 'react';
import Developer from './Developer';

class EndnightGamesLtd extends React.Component {
  render() {
    return (
      <div>
        <Developer
          developer="Endnight Games Ltd."
          logoURL="https://static.giantbomb.com/uploads/square_medium/2/23546/2569979-screen+shot+2013-11-12+at+5.49.55+pm.png"
          year="2014"
          loc="Not Available."
          about="Not Available."
          gameURL="/TheForest"
          game="The Forest"
          articleURL="/Article3"
          article="V0.73 and release plans"
          twitterURL=""
          twitter={{ screenName: 'benfalcone1', sourceType: 'profile' }}
        />
      </div>
    );
  }
}

export default EndnightGamesLtd;
