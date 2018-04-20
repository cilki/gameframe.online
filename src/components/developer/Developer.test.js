/**
 * Unit test script for Developer.
 */

const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const { shallow } = require('enzyme');
const React = require('react');
const sinon = require('sinon');
const { assert } = require('chai');
const { List, Map } = require('immutable');

describe('developer', function() {
  describe('<Developer />', function() {
    /**
     * @description - Uses proxyquire to retrieve the react component while mocking
     * the relevant dependencies.
     * @returns {React.Component}
     */
    function getDeveloper() {
      return proxyquire('./Developer.js', {
        'radium': component => component
      }).default;
    }

    /**
     * This generates three tests for `<Developer />`'s prop functions.
     */
    const propFunctions = [
      'fetchDeveloper',
    ];
    for (let fun of propFunctions) {
      it('Calls `' + fun + '()` when it mounts', function() {
        let requiredProps = {},
          propStub = null;
        // All of the functions are required, so they all must be defined.
        for (let requiredProp of propFunctions) {
          if (requiredProp !== fun) {
            requiredProps[requiredProp] = () => {};
          }
          else {
            propStub = sinon.stub();
            requiredProps[requiredProp] = propStub;
          }
        }
        const Developer = getDeveloper();
        const wrapper = shallow(<Developer {...requiredProps} />);
        assert(propStub.called, '`' + fun + '()` was never called');
      });
    }
  });

  describe('DeveloperActions.js', function() {
    /**
     * @description - Convenience method for retrieving the Developer module
     * with a clean slate using proxyquire.
     * @param {Object=} [{}] overrides
     * @returns {Object}
     */
    function getDeveloperActions(overrides = {}) {
      return proxyquire('./DeveloperActions.js', overrides);
    }

    describe('`fetchDeveloper()`', function() {
      it('Returns true if `getDeveloper()` returns null', function() {
        const getDeveloperStub = sinon.stub().returns(null);
        const { fetchDeveloper } = getDeveloperActions({
          './DeveloperSelectors': {
            getDeveloper: getDeveloperStub
          }
        });

        assert.isOk(fetchDeveloper(), '`fetchDeveloper()` returned false');
      });
    });
  });

  describe('DeveloperSelectors.js', function() {
    /**
     * @description - Convenience method for retrieving the Developer module
     * with a clean slate using proxyquire.
     * @param {Object=} [{}] overrides
     * @returns {Object}
     */
    function getDeveloperSelectors() {
      return proxyquire('./DeveloperSelectors.js', {});
    }

    describe('`getDeveloper()`', function() {
      it('Returns a JS element for a single developer', function() {
        const { getDeveloper } = getDeveloperSelectors();
        const state = {
          'developers': {
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

        const result = getDeveloper(state, { id });
        assert.deepEqual(
          result,
          {
            'id': {
              'requested': true
            }
          }
        );
      });

      it('Returns undefined when there are no developers', function() {
        const { getDeveloper } = getDeveloperSelectors();
        const state = {
          'developers': {
            'models': {
            }
          }
        };

        const id = '1';

        const result = getDeveloper(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns a JS element for a single developer when there is more than one developer in the state', function() {
        const { getDeveloper } = getDeveloperSelectors();
        const state = {
          'developers': {
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

        const result = getDeveloper(state, { id });
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
        const { getDeveloper } = getDeveloperSelectors();
        const state = {
          'developers': {
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

        const result = getDeveloper(state, { id });
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

      it('Returns undefined when there is more than one developer in the state but none match the requested id', function() {
        const { getDeveloper } = getDeveloperSelectors();
        const state = {
          'developers': {
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

        const result = getDeveloper(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns undefined when the requested id is negative', function() {
        const { getDeveloper } = getDeveloperSelectors();
        const state = {
          'developers': {
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

        const result = getDeveloper(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns undefined when the requested id is not a number', function() {
        const { getDeveloper } = getDeveloperSelectors();
        const state = {
          'developers': {
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

        const result = getDeveloper(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns undefined when the requested id is not an integer', function() {
        const { getDeveloper } = getDeveloperSelectors();
        const state = {
          'developers': {
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

        const result = getDeveloper(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns a JS element that is a subset of the state as long as the id exists (even if it is not an integer)', function() {
        const { getDeveloper } = getDeveloperSelectors();
        const state = {
          'developers': {
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

        const result = getDeveloper(state, { id });
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

    describe('`makeGetDeveloper()`', function() {
      it('Returns a selector for returning developers.', function() {
        const { makeGetDeveloper } = getDeveloperSelectors();

        const result = makeGetDeveloper();
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });
    });

    describe('`makeGetDeveloperGames()`', function() {
      it('Returns a selector for returning developer games.', function() {
        const { makeGetDeveloperGames } = getDeveloperSelectors();

        const result = makeGetDeveloperGames(null);
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning developer games when a developer selector is passed in.', function() {
        const { makeGetDeveloperGames, makeGetDeveloper } = getDeveloperSelectors();

        const result = makeGetDeveloperGames(makeGetDeveloper());
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning developer games when nothing is passed in (default to null).', function() {
        const { makeGetDeveloperGames } = getDeveloperSelectors();

        const result = makeGetDeveloperGames();
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });
    });

    describe('`makeGetDeveloperArticles()`', function() {
      it('Returns a selector for returning developer articles.', function() {
        const { makeGetDeveloperArticles } = getDeveloperSelectors();

        const result = makeGetDeveloperArticles(null);
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning developer articles when a developer selector is passed in.', function() {
        const { makeGetDeveloperArticles, makeGetDeveloper } = getDeveloperSelectors();

        const result = makeGetDeveloperArticles(makeGetDeveloper());
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning developer articles when nothing is passed in (default to null).', function() {
        const { makeGetDeveloperArticles} = getDeveloperSelectors();

        const result = makeGetDeveloperArticles();
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });
    });
  });
});
