
/**
 * Unit test script for Game
 */

const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const { shallow } = require('enzyme');
const React = require('react');
const sinon = require('sinon');
const { assert } = require('chai');
const { List, Map } = require('immutable');

describe('game', function() {
  describe('<Game />', function() {
    /**
     * @description - Uses proxyquire to retrieve the react component while mocking
     * the relevant dependencies
     * @returns {React.Component}
     */
    function getGame() {
      return proxyquire('./Game.js', {
        'radium': component => component
      }).default;
    }

    /**
     * This generates three tests for `<Game />`'s prop functions
     */
    const propFunctions = [
      'fetchGame',
    ];
    for (let fun of propFunctions) {
      it('Calls `' + fun + '()` when it mounts', function() {
        let requiredProps = {},
          propStub = null;
        // all of the functions are required, so they all must be defined
        for (let requiredProp of propFunctions) {
          if (requiredProp !== fun) {
            requiredProps[requiredProp] = () => {};
          }
          else {
            propStub = sinon.stub();
            requiredProps[requiredProp] = propStub;
          }
        }
        const Game = getGame();
        const wrapper = shallow(<Game {...requiredProps} />);
        assert(propStub.called, '`' + fun + '()` was never called');
      });
    }
  });

  describe('GameActions.js', function() {
    /**
     * @description - Convenience method for retrieving the Game module
     * with a clean slate using proxyquire
     * @param {Object=} [{}] overrides
     * @returns {Object}
     */
    function getGameActions(overrides = {}) {
      return proxyquire('./GameActions.js', overrides);
    }

    describe('`fetchGame()`', function() {
      it('Returns true if `getGame()` returns null', function() {
        const getGameStub = sinon.stub().returns(null);
        const { fetchGame } = getGameActions({
          './GameSelectors': {
            getGame: getGameStub
          }
        });

        assert.isOk(fetchGame(), '`fetchGame()` returned false');
      });
    });
  });

  describe('GameSelectors.js', function() {
    /**
     * @description - Convenience method for retrieving the Game module
     * with a clean slate using proxyquire
     * @param {Object=} [{}] overrides
     * @returns {Object}
     */
    function getGameSelectors() {
      return proxyquire('./GameSelectors.js', {});
    }

    describe('`getGame()`', function() {
      it('Returns a JS element for a single game', function() {
        const { getGame } = getGameSelectors();
        const state = {
          'games': {
            'models': {
              '1': {
                'id': {
                'requested': true
                }
              }
            }
          }
        };

        const id = '1';

        const result = getGame(state, { id });
        assert.deepEqual(
          result,
          {
            'id': {
              'requested': true
            }
          }
        );
      });
    });
  });
});
