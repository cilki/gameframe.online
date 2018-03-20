/**
 * Unit test script for Games
 */

const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const { shallow } = require('enzyme');
const React = require('react');
const sinon = require('sinon');
const { assert } = require('chai');
const { List, Map } = require('immutable');

describe('games', function() {
  describe('<Games />', function() {
    /**
     * @description - Uses proxyquire to retrieve the react component
     * while mocking the relevant dependencies
     * @returns {React.Component}
     */
    function getGames() {
      return proxyquire('./Games.js', {
        'radium': component => component
      }).default;
    }
  
    /**
     * Test generator for `<Games />`'s prop functions
     */
    const propFunction = ['fetchGames'];
    for (let fun of propFunction) {
      it('Calls `' + fun + '()` when it mounts', function() {
        let requiredProps = {},
          propStub = null;
      
        for (let requiredProp of propFunction) {
          if (requiredProp !== fun) {
            requiredProps[requiredProp] = () => {};
          } else {
            propStub = sinon.stub();
            requiredProps[requiredProp] = propStub;
          }
        }
      
        const Games = getGames();
        const wrapper = shallow(
          <Games
            currentPage={1}
            totalPages={1}
            {...requiredProps}
          />
        );
        assert(propStub.called, '`' + fun + '()` was never called');
      });
    }
  });
  
  describe('GamesActions.js', function() {
    /**
     * @description - Retrieves Games modules with a clean slate
     * @param {Object=} [{}] overrides
     * @returns {Object}
     */
    function getGamesActions(overrides = {}) {
      return proxyquire('./GamesActions.js', overrides);
    }
    
    describe('`shouldFetchGames()`', function() {
      // PAGE_SIZE = 12
      it('Returns true if `getGamesByPage(state, pageNumber).length` < PAGE_SIZE', function() {
        const getGamesStub = sinon.stub().returns([]);
        const { shouldFetchGames } = getGamesActions({
          './GamesSelectors': {
            getGamesByPage: getGamesStub
          }
        });
        const f = shouldFetchGames();
        assert.equal(f, true, '`shouldFetchGames(...)` returned false');
      });
      
      it('Returns true if `getGamesByPage(state, pageNumber).length` < PAGE_SIZE', function() {
        const getGamesStub = sinon.stub().returns([1, 2, 3]);
        const { shouldFetchGames } = getGamesActions({
          './GamesSelectors': {
            getGamesByPage: getGamesStub
          }
        });
        const f = shouldFetchGames();
        assert.equal(f, true, '`shouldFetchGames(...)` returned false');
      });
      
      it('Returns false if `getGamesByPage(state, pageNumber).length` >= PAGE_SIZE', function() {
        const getGamesStub = sinon.stub().returns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        const { shouldFetchGames } = getGamesActions({
          './GamesSelectors': {
            getGamesByPage: getGamesStub
          }
        });
        const f = shouldFetchGames();
        assert.equal(f, false, '`shouldFetchGames(...)` returned true');
      });

      it('Returns false if `getGamesByPage(state, pageNumber).length` >= PAGE_SIZE', function() {
        const getGamesStub = sinon.stub().returns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
        const { shouldFetchGames } = getGamesActions({
          './GamesSelectors': {
            getGamesByPage: getGamesStub
          }
        });
        const f = shouldFetchGames();
        assert.equal(f, false, '`shouldFetchGames(...)` returned true');
      });       
    });
  });
});
