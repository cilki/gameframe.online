/**
 * Unit test script for Article.
 */

const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const { shallow } = require('enzyme');
const React = require('react');
const sinon = require('sinon');
const { assert } = require('chai');
const { List, Map } = require('immutable');

describe('article', function() {
  describe('<Article />', function() {
    /**
     * @description - Uses proxyquire to retrieve the react component while mocking
     * the relevant dependencies.
     * @returns {React.Component}
     */
    function getArticle() {
      return proxyquire('./Article.js', {
        'radium': component => component
      }).default;
    }

    /**
     * This generates three tests for `<Article />`'s prop functions.
     */
    const propFunctions = [
      'fetchArticle',
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
        const Article = getArticle();
        const wrapper = shallow(<Article {...requiredProps} />);
        assert(propStub.called, '`' + fun + '()` was never called');
      });
    }
  });

  describe('ArticleActions.js', function() {
    /**
     * @description - Convenience method for retrieving the Article module
     * with a clean slate using proxyquire.
     * @param {Object=} [{}] overrides
     * @returns {Object}
     */
    function getArticleActions(overrides = {}) {
      return proxyquire('./ArticleActions.js', overrides);
    }

    describe('`fetchArticle()`', function() {
      it('Returns true if `getArticle()` returns null', function() {
        const getArticleStub = sinon.stub().returns(null);
        const { fetchArticle } = getArticleActions({
          './ArticleSelectors': {
            getArticle: getArticleStub
          }
        });

        assert.isOk(fetchArticle(), '`fetchArticle()` returned false');
      });
    });
  });

  describe('ArticleSelectors.js', function() {
    /**
     * @description - Convenience method for retrieving the Article module
     * with a clean slate using proxyquire.
     * @param {Object=} [{}] overrides
     * @returns {Object}
     */
    function getArticleSelectors() {
      return proxyquire('./ArticleSelectors.js', {});
    }

    describe('`getArticle()`', function() {
      it('Returns a JS element for a single article', function() {
        const { getArticle } = getArticleSelectors();
        const state = {
          'articles': {
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

        const result = getArticle(state, { id });
        assert.deepEqual(
          result,
          {
            'id': {
              'requested': true
            }
          }
        );
      });

      it('Returns undefined when there are no articles', function() {
        const { getArticle } = getArticleSelectors();
        const state = {
          'articles': {
            'models': {
            }
          }
        };

        const id = '1';

        const result = getArticle(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns a JS element for a single article when there is more than one article in the state', function() {
        const { getArticle } = getArticleSelectors();
        const state = {
          'articles': {
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

        const result = getArticle(state, { id });
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
        const { getArticle } = getArticleSelectors();
        const state = {
          'articles': {
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

        const result = getArticle(state, { id });
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

      it('Returns undefined when there is more than one article in the state but none match the requested id', function() {
        const { getArticle } = getArticleSelectors();
        const state = {
          'articles': {
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

        const result = getArticle(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns undefined when the requested id is negative', function() {
        const { getArticle } = getArticleSelectors();
        const state = {
          'articles': {
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

        const result = getArticle(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns undefined when the requested id is not a number', function() {
        const { getArticle } = getArticleSelectors();
        const state = {
          'articles': {
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

        const result = getArticle(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns undefined when the requested id is not an integer', function() {
        const { getArticle } = getArticleSelectors();
        const state = {
          'articles': {
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

        const result = getArticle(state, { id });
        assert.deepEqual(
          result,
          undefined
        );
      });

      it('Returns a JS element that is a subset of the state as long as the id exists (even if it is not an integer)', function() {
        const { getArticle } = getArticleSelectors();
        const state = {
          'articles': {
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

        const result = getArticle(state, { id });
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

    describe('`makeGetArticle()`', function() {
      it('Returns a selector for returning articles.', function() {
        const { makeGetArticle } = getArticleSelectors();

        const result = makeGetArticle();
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });
    });

    describe('`makeGetArticleGames()`', function() {
      it('Returns a selector for returning article games.', function() {
        const { makeGetArticleGames } = getArticleSelectors();

        const result = makeGetArticleGames(null);
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning article games when a article selector is passed in.', function() {
        const { makeGetArticleGames, makeGetArticle } = getArticleSelectors();

        const result = makeGetArticleGames(makeGetArticle());
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning article games when nothing is passed in (default to null).', function() {
        const { makeGetArticleGames } = getArticleSelectors();

        const result = makeGetArticleGames();
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });
    });

    describe('`makeGetArticleDevelopers()`', function() {
      it('Returns a selector for returning article developers.', function() {
        const { makeGetArticleDevelopers } = getArticleSelectors();

        const result = makeGetArticleDevelopers(null);
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning article developers when a article selector is passed in.', function() {
        const { makeGetArticleDevelopers, makeGetArticle } = getArticleSelectors();

        const result = makeGetArticleDevelopers(makeGetArticle());
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });

      it('Returns a selector for returning article developers when nothing is passed in (default to null).', function() {
        const { makeGetArticleDevelopers} = getArticleSelectors();

        const result = makeGetArticleDevelopers();
        assert.deepEqual(
          `${result}`,
            'function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      \/\/ apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  }'
        );
      });
    });
  });
});
