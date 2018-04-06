
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

      it('Returns undefined when there are no games', function() {
        const { getGame } = getGameSelectors();
        const state = {
          'games': {
            'models': {
            }
          }
        };

        const id = '1';

        const result = getGame(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns a JS element for a single game when there is more than one game in the state', function() {
        const { getGame } = getGameSelectors();
        const state = {
          'games': {
            'models': {
              '1': {
                'id': {
                'requested': true
                }
              },
              '2': {
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

      it('Returns a JS element that is a subset of the state', function() {
        const { getGame } = getGameSelectors();
        const state = {
          'games': {
            'models': {
              '1': {
                'id': {
                'requested': false,
                'extraInfoOnlyUsedInThisTest': 'notFoundElsewhere'
                }
              },
              '2': {
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
              'requested': false,
              'extraInfoOnlyUsedInThisTest': 'notFoundElsewhere'
            }
          }
        );
      });

      it('Returns undefined when there is more than one game in the state but none match the requested id', function() {
        const { getGame } = getGameSelectors();
        const state = {
          'games': {
            'models': {
              '1': {
                'id': {
                'requested': true
                }
              },
              '2': {
                'id': {
                'requested': true
                }
              }
            }
          }
        };

        const id = '3';

        const result = getGame(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns undefined when the requested id is negative', function() {
        const { getGame } = getGameSelectors();
        const state = {
          'games': {
            'models': {
              '1': {
                'id': {
                'requested': true
                }
              },
              '2': {
                'id': {
                'requested': true
                }
              }
            }
          }
        };

        const id = '-24';

        const result = getGame(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns undefined when the requested id is not a number', function() {
        const { getGame } = getGameSelectors();
        const state = {
          'games': {
            'models': {
              '1': {
                'id': {
                'requested': true
                }
              },
              '2': {
                'id': {
                'requested': true
                }
              }
            }
          }
        };

        const id = 'Twenty Four';

        const result = getGame(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns undefined when the requested id is not an integer', function() {
        const { getGame } = getGameSelectors();
        const state = {
          'games': {
            'models': {
              '1': {
                'id': {
                'requested': true
                }
              },
              '2': {
                'id': {
                'requested': true
                }
              }
            }
          }
        };

        const id = '2.0';

        const result = getGame(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns a JS element that is a subset of the state as long as the id exists (even if it is not an integer)', function() {
        const { getGame } = getGameSelectors();
        const state = {
          'games': {
            'models': {
              'Twenty Four': {
                'id': {
                'requested': false,
                'extraInfoOnlyUsedInThisTest': 'notFoundElsewhere'
                }
              },
              'Twenty Five': {
                'id': {
                'requested': true
                }
              }
            }
          }
        };

        const id = 'Twenty Four';

        const result = getGame(state, { id });
        assert.deepEqual(
          result,
          {
            'id': {
              'requested': false,
              'extraInfoOnlyUsedInThisTest': 'notFoundElsewhere'
            }
          }
        );
      });
    });

    describe('`makeGetGame()`', function() {
      it('Returns a selector for returning games.', function() {
        const { makeGetGame } = getGameSelectors();

        const result = makeGetGame();
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });
    });

    describe('`makeGetGameGenres()`', function() {
      it('Returns a selector for returning game genres.', function() {
        const { makeGetGameGenres } = getGameSelectors();

        const result = makeGetGameGenres(null);
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning game genres when a game selector is passed in.', function() {
        const { makeGetGameGenres, makeGetGame } = getGameSelectors();

        const result = makeGetGameGenres(makeGetGame());
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning game genres when nothing is passed in (default to null).', function() {
        const { makeGetGameGenres } = getGameSelectors();

        const result = makeGetGameGenres();
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });
    });

    describe('`makeGetGameDevelopers()`', function() {
      it('Returns a selector for returning game developers.', function() {
        const { makeGetGameDevelopers } = getGameSelectors();

        const result = makeGetGameDevelopers(null);
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning game developers when a game selector is passed in.', function() {
        const { makeGetGameDevelopers, makeGetGame } = getGameSelectors();

        const result = makeGetGameDevelopers(makeGetGame());
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning game developers when nothing is passed in (default to null).', function() {
        const { makeGetGameDevelopers } = getGameSelectors();

        const result = makeGetGameDevelopers();
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });
    });

    describe('`makeGetGameArticles()`', function() {
      it('Returns a selector for returning game articles.', function() {
        const { makeGetGameArticles } = getGameSelectors();

        const result = makeGetGameArticles(null);
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning game articles when a game selector is passed in.', function() {
        const { makeGetGameArticles, makeGetGame } = getGameSelectors();

        const result = makeGetGameArticles(makeGetGame());
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning game articles when nothing is passed in (default to null).', function() {
        const { makeGetGameArticles} = getGameSelectors();

        const result = makeGetGameArticles();
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });
    });
  });
});
