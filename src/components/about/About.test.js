
/**
 * Unit test script for About
 */

const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const { shallow } = require('enzyme');
const React = require('react');
const sinon = require('sinon');
const { assert } = require('chai');
const { List, Map } = require('immutable');

describe('about', function() {
  describe('<About />', function() {
    /**
     * @description - Uses proxyquire to retrieve the react component while mocking
     * the relevant dependencies
     * @returns {React.Component}
     */
    function getAbout() {
      return proxyquire('./About.js', {
        'radium': component => component
      }).default;
    }

    /**
     * This generates three tests for `<About />`'s prop functions
     */
    const propFunctions = [
      'fetchDescription',
      'fetchExplanation',
      'fetchContributors',
      'fetchIssues',
      'fetchTools',
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
        const About = getAbout();
        const wrapper = shallow(<About {...requiredProps} />);
        assert(propStub.called, '`' + fun + '()` was never called');
      });
    }
  });

  describe('AboutActions.js', function() {
    /**
     * @description - Convenience method for retrieving the About module
     * with a clean slate using proxyquire
     * @param {Object=} [{}] overrides
     * @returns {Object}
     */
    function getAboutActions(overrides = {}) {
      return proxyquire('./AboutActions.js', overrides);
    }

    describe('`shouldFetchDescription()`', function() {
      it('Returns true if `getDescription()` returns null', function() {
        const getDescriptionStub = sinon.stub().returns(null);
        const { shouldFetchDescription } = getAboutActions({
          './AboutSelectors': {
            getDescription: getDescriptionStub
          }
        });

        assert.isOk(shouldFetchDescription(), '`shouldFetchDescription()` returned false');
      });

      it('Returns false if `getDescription()` doesn\'t return null', function() {
        const getDescriptionStub = sinon.stub().returns('');
        const { shouldFetchDescription } = getAboutActions({
          './AboutSelectors': {
            getDescription: getDescriptionStub
          }
        });

        assert.isNotOk(shouldFetchDescription(), '`shouldFetchDescription()` returned true');
      });
    });

    describe('`shouldFetchExplanation()`', function() {
      it('Returns true if `getExplanation()` returns null', function() {
        const getExplanationStub = sinon.stub().returns(null);
        const { shouldFetchExplanation } = getAboutActions({
          './AboutSelectors': {
            getExplanation: getExplanationStub
          }
        });

        assert.isOk(shouldFetchExplanation(), '`shouldFetchExplanation()` returned false');
      });

      it('Returns false if `getExplanation()` doesn\'t return null', function() {
        const getExplanationStub = sinon.stub().returns('');
        const { shouldFetchExplanation } = getAboutActions({
          './AboutSelectors': {
            getExplanation: getExplanationStub
          }
        });

        assert.isNotOk(shouldFetchExplanation(), '`shouldFetchExplanation()` returned true');
      });
    });

    describe('`shouldFetchContributors()`', function() {
      it('Returns true if `getAllContributors()` returns a List of size 0', function() {
        const getAllContributorsStub = sinon.stub().returns(List());
        const { shouldFetchContributors } = getAboutActions({
          './AboutSelectors': {
            getAllContributors: getAllContributorsStub
          }
        });

        assert.isOk(shouldFetchContributors(), '`shouldFetchContributors()` returned false');
      });

      it('Returns false if `getAllContributors()` returns a List with size bigger than 0', function() {
        const getAllContributorsStub = sinon.stub().returns(List([Map({})]));
        const { shouldFetchContributors } = getAboutActions({
          './AboutSelectors': {
            getAllContributors: getAllContributorsStub
          }
        });

        assert.isNotOk(shouldFetchContributors(), '`shouldFetchContributors()` returned true');
      });
    });

    describe('`shouldFetchIssues()`', function() {
      it('Returns true if `getIssues()` returns a List of size 0', function() {
        const getIssuesStub = sinon.stub().returns(List());
        const { shouldFetchIssues } = getAboutActions({
          './AboutSelectors': {
            getIssues: getIssuesStub
          }
        });

        assert.isOk(shouldFetchIssues(), '`shouldFetchIssues()` returned false');
      });

      it('Returns false if `getIssues()` returns a List of size bigger than 0', function() {
        const getIssuesStub = sinon.stub().returns(List([Map({})]));
        const { shouldFetchIssues } = getAboutActions({
          './AboutSelectors': {
            getIssues: getIssuesStub
          }
        });

        assert.isNotOk(shouldFetchIssues(), '`shouldFetchIssues()` returned true'); 
      });
    });

    describe('`descriptionRequested()`', function() {
      it('Returns true when dispatched an \'FETCH_DESCRIPTION_REQUEST\' action', function() {
        const { descriptionRequested } = getAboutActions();

        const state = descriptionRequested(null, { type: 'FETCH_DESCRIPTION_REQUEST' });
        assert.equal(state, true, '`descriptionRequested()` didn\'t reduce the action correctly');
      });

      it('Returns false when dispatched an \'FETCH_DESCRIPTION_RESPONSE\' action', function() {
        const { descriptionRequested } = getAboutActions();

        const state = descriptionRequested(null, { type: 'FETCH_DESCRIPTION_RESPONSE' });
        assert.equal(state, false, '`descriptionRequested()` didn\'t reduce the action correctly');
      });
    });

    describe('`descriptionError()`', function() {
      it('Returns null when given a successful \'FETCH_DESCRIPTION_RESPONSE\' action', function() {
        const { descriptionError } = getAboutActions();

        const state = descriptionError(true, { type: 'FETCH_DESCRIPTION_RESPONSE', payload: 'description'});
        assert.isNull(state, '`descriptionError()` didn\'t reduce the action correctly');
      });

      it('Returns the error string when given an error in a \'FETCH_DESCRIPTION_RESPONSE\' action', function() {
        const { descriptionError } = getAboutActions();

        const state = descriptionError(null, { type: 'FETCH_DESCRIPTION_RESPONSE', payload: new Error('error'), error: true});
        assert.equal(state, 'error', '`descriptionError()` didn\'t reduce the error action correctly');
      });
    });

    describe('`description()`', function() {
      it('Returns the payload in a successful \'FETCH_DESCRIPTION_RESPONSE\' action', function() {
        const { description } = getAboutActions();

        const state = description(null, { type: 'FETCH_DESCRIPTION_RESPONSE', payload: 'description' });
        assert.equal(state, 'description', '`description()` didn\'t reduce the action correctly');
      });

      it('Returns the state when given an unsuccessful \'FETCH_DESCRIPTION_RESPONSE\' action', function() {
        const { description } = getAboutActions();

        const state = description(null, { type: 'FETCH_DESCRIPTION_RESPONSE', payload: new Error('error'), error: true});
        assert.isNull(state, '`description()` didn\'t reduce the error action correctly');
      });
    });

    describe('`explanationRequested()`', function() {
      it('Returns true when dispatched an \'FETCH_EXPLANATION_REQUEST\' action', function() {
        const { explanationRequested } = getAboutActions();

        const state = explanationRequested(null, { type: 'FETCH_EXPLANATION_REQUEST' });
        assert.equal(state, true, '`explanationRequested()` didn\'t reduce the action correctly');
      });

      it('Returns false when dispatched an \'FETCH_EXPLANATION_RESPONSE\' action', function() {
        const { explanationRequested } = getAboutActions();

        const state = explanationRequested(null, { type: 'FETCH_EXPLANATION_RESPONSE' });
        assert.equal(state, false, '`explanationRequested()` didn\'t reduce the action correctly');
      });
    });

    describe('`explanationError()`', function() {
      it('Returns null when given a successful \'FETCH_EXPLANATION_RESPONSE\' action', function() {
        const { explanationError } = getAboutActions();

        const state = explanationError(true, { type: 'FETCH_EXPLANATION_RESPONSE', payload: 'description'});
        assert.isNull(state, '`explanationError()` didn\'t reduce the action correctly');
      });

      it('Returns the error string when given an error in a \'FETCH_EXPLANATION_RESPONSE\' action', function() {
        const { explanationError } = getAboutActions();

        const state = explanationError(null, { type: 'FETCH_EXPLANATION_RESPONSE', payload: new Error('error'), error: true});
        assert.equal(state, 'error', '`explanationError()` didn\'t reduce the error action correctly');
      });
    });

    describe('`explanation()`', function() {
      it('Returns the payload in a successful \'FETCH_EXPLANATION_RESPONSE\' action', function() {
        const { explanation } = getAboutActions();

        const state = explanation(null, { type: 'FETCH_EXPLANATION_RESPONSE', payload: 'explanation' });
        assert.equal(state, 'explanation', '`explanation()` didn\'t reduce the action correctly');
      });

      it('Returns the state when given an unsuccessful \'FETCH_EXPLANATION_RESPONSE\' action', function() {
        const { explanation } = getAboutActions();

        const state = explanation(null, { type: 'FETCH_EXPLANATION_RESPONSE', payload: new Error('error'), error: true});
        assert.isNull(state, '`explanation()` didn\'t reduce the error action correctly');
      });
    });

    describe('`contributorsRequested()`', function() {
      it('Returns true when given a \'FETCH_CONTRIBUTORS_REQUEST\' action', function() {
        const { contributorsRequested } = getAboutActions();

        const state = contributorsRequested(null, { type: 'FETCH_CONTRIBUTORS_REQUEST' });
        assert.isOk(state, '`contributorsRequested()` didn\'t reduce the action correctly');
      });

      it('Returns false when given a \'FETCH_CONTRIBUTORS_RESPONSE\' action', function() {
        const { contributorsRequested } = getAboutActions();

        const state = contributorsRequested(null, { type: 'FETCH_CONTRIBUTORS_RESPONSE' });
        assert.equal(state, false, '`contributorsRequested()` didn\'t reduce the action correctly');
      });
    });

    describe('`constributorsError()`', function() {
      it('Returns null when given a successful \'FETCH_CONTRIBUTORS_RESPONSE\' action', function() {
        const { contributorsError } = getAboutActions();

        const state = contributorsError(true, { type: 'FETCH_CONTRIBUTORS_RESPONSE' });
        assert.isNull(state, '`constributorsError()` didn\'t reduce the action correctly');
      });

      it('Returns the error string when given an unsuccessful \'FETCH_CONTRIBUTORS_RESPONSE\' action', function() {
        const { contributorsError } = getAboutActions();

        const state = contributorsError(null, { type: 'FETCH_CONTRIBUTORS_RESPONSE', error: true, payload: new Error('error') });
        assert.equal(state, 'error', '`constributorsError()` didn\'t retrieve the error payload from the action');
      });
    });

    describe('`contributors()`', function() {
      const contributor = { login: 'GithubLogin', commits: 4, avatar: 'GithubAvatar' };
      const contributorRaw = { login: 'GithubLogin', contributions: 4, avatar_url: 'GithubAvatar' };

      it('Returns the initial state when given an unsuccessful \'FETCH_CONTRIBUTORS_RESPONSE\' action', function() {
        const { contributors } = getAboutActions();

        const state = contributors(null, { type: 'FETCH_CONTRIBUTORS_RESPONSE', error: true, payload: new Error('error') });
        assert.isNull(state, '`contributors()` didn\'t return the given initial state in the case of an error');
      });

      it('Returns the correct data structures when receiving a valid \'FETCH_CONTRIBUTORS_RESPONSE\' action', function() {
        const { contributors } = getAboutActions();

        const state = contributors(null, { type: 'FETCH_CONTRIBUTORS_RESPONSE', payload: [contributorRaw]});
        assert.deepEqual(state.toJS(), [contributor], '`contributors()` didn\'t return the correct state');
      });

      it('Doesn\'t modify the state when given a \'FETCH_STATS_REQUEST\' action with an invalid login', function() {
        const { contributors } = getAboutActions();
        
        const state = List([Map(contributor)]);
        const nextState = contributors(state, { type: 'FETCH_STATS_REQUEST', payload: 'Another GithubLogin' });
        assert.equal(nextState, state, '`contributors()` returned a new state in error');
      });

      it('Doesn\'t modify the state when given a \'FETCH_STATS_REQUEST\' action with no contributors in the state', function() {
        const { contributors } = getAboutActions();
        
        const state = List([]);
        const nextState = contributors(state, { type: 'FETCH_STATS_REQUEST', payload: 'Another GithubLogin' });
        assert.equal(nextState, state, '`contributors()` returned a new state in error');
      });

      it('Correctly sets the \'statsRequest\' attribute in a contributor if given a valid \'FETCH_STATS_REQUEST\' action', function() {
        const { contributors } = getAboutActions();
        
        const state = List([Map(contributor)]);
        const nextState = contributors(state, { type: 'FETCH_STATS_REQUEST', payload: contributor.login });

        assert.deepEqual(
          nextState.toJS(),
          [Object.assign({}, contributor, { statsRequest: true })],
          '`contributors()` didn\'t set the correct attribute'
        );
      });

      it('Doesn\'t modify the state when given a \'FETCH_STATS_RESPONSE\' action with invalid login', function() {
        const { contributors } = getAboutActions();

        const state = List([Map(contributor)]);
        const nextState = contributors(state, { type: 'FETCH_STATS_RESPONSE', payload: { login: 'Another GithubLogin'}});

        assert.equal(nextState, state, '`contributors()` returned a new state in error');
      });

      it('Doesn\'t modify the state when given a \'FETCH_STATS_RESPONSE\' action with no contributors in the state', function() {
        const { contributors } = getAboutActions();

        const state = List([]);
        const nextState = contributors(state, { type: 'FETCH_STATS_RESPONSE', payload: { login: 'GithubLogin'}});

        assert.equal(nextState, state, '`contributors()` returned a new state in error');
      });

      it('Correctly sets the attributes of a contributor when given a valid \'FETCH_STATS_RESPONSE\' action', function() {
        const { contributors } = getAboutActions();

        const state = List([Map(contributor)]);
        const data = {
          bio: 'Bio',
          responsibilities: 'Responsible Developer',
          name: 'Someone\'s Name',
          unitTests: 0,
        };
        const nextState = contributors(
          state,
          {
            type: 'FETCH_STATS_RESPONSE',
            payload: {
              login: 'GithubLogin',
              data,
            }
          }
        );

        assert.deepEqual(
          nextState.toJS(),
          [
            Object.assign({}, contributor, data, { statsRequest: false, statsError: null })
          ],
          '`contributors()` didn\'t return the correct state'
        );
      });

      it('Doesn\'t modify the state if a \'FETCH_STATS_RESPONSE\' action is dispatched with an error but invalid login', function() {
        const { contributors } = getAboutActions();

        const state = List([Map(contributor)]);
        const nextState = contributors(state,
          { type: 'FETCH_STATS_RESPONSE', payload: {
            login: 'Another GithubLogin', data: new Error('error'), error: true 
          }}
        );

        assert.equal(nextState, state, '`contributors()` returned a modified state in error');
      });

      it('Correctly sets the value of \'statsError\' if \'FETCH_STATS_RESPONSE\' action is dispatched with an error', function() {
        const { contributors } = getAboutActions();

        const state = List([Map(contributor)]);
        const nextState = contributors(state,
          { type: 'FETCH_STATS_RESPONSE',
            payload: {
              login: 'GithubLogin',
              data: new Error('error'),
              error: true 
            }
          }
        );

        assert.deepEqual(
          nextState.toJS(),
          [
            Object.assign({}, contributor, { statsRequest: false, statsError: 'error'})
          ],
          '`contributors()` didn\'t modify the state correctly'
        );
      });
    });

    describe('`issuesRequested()`', function() {
      it('Returns true when dispatched a \'FETCH_ISSUES_REQUEST\' action', function() {
        const { issuesRequested } = getAboutActions();

        const state = issuesRequested(null, { type: 'FETCH_ISSUES_REQUEST' });
        assert.isOk(state, '`issuesRequested()` didn\'t return true from a \'FETCH_ISSUES_REQUEST\' action');
      });

      it('Returns false when dispatched a \'FETCH_ISSUES_RESPONSE\' action', function() {
        const { issuesRequested } = getAboutActions();

        const state = issuesRequested(null, { type: 'FETCH_ISSUES_RESPONSE' });
        assert.isNotOk(state, '`issuesRequested()` didn\'t return false from a \'FETCH_ISSUES_RESPONSE\' action');
      });
    });

    describe('`issuesError()`', function() {
      it('Returns null when given a successful \'FETCH_ISSUES_RESPONSE\' action', function() {
        const { issuesError } = getAboutActions();

        const state = issuesError(true, { type: 'FETCH_ISSUES_RESPONSE', payload: [] });
        assert.isNull(state, '`issuesError()` didn\'t return null after a successful \'FETCH_ISSUES_RESPONSE\' action was dispatched');
      });

      it('Returns the error string when given a \'FETCH_ISSUES_RESPONSE\' action with an error', function() {
        const { issuesError } = getAboutActions();

        const state = issuesError(true, { type: 'FETCH_ISSUES_RESPONSE', payload: new Error('error'), error: true });
        assert.equal(state, 'error', '`issuesError()` didn\'t return an error after an unsuccessful \'FETCH_ISSUES_RESPONSE\' action was dispatched');
      });
    });

    describe('`issues()`', function() {
      it('Returns the given state if given a \'FETCH_ISSUES_RESPONSE\' action with an error', function() {
        const { issues } = getAboutActions();

        const state = issues(null, { type: 'FETCH_ISSUES_RESPONSE', payload: new Error('error'), error: true});
        assert.isNull(state, '`issues()` didn\'t return the given state when dispatched an error');
      });

      it('Returns an empty List if given a \'FETCH_ISSUES_RESPONSE\' action with an empty but existant payload', function() {
        const { issues } = getAboutActions();

        const state = issues(null, { type: 'FETCH_ISSUES_RESPONSE', payload: [] });
        assert.deepEqual(state.toJS(), [], '`issues()` didn\'t return an empty list when given an empty payload');
      });

      it('Returns the correct state with correct attributes assigned if given an \'FETCH_ISSUES_RESPONSE\' action', function() {
        const { issues } = getAboutActions();

        const issueRaw = {
          id: 'IssueID',
          user: {
            login: 'GithubLogin'
          }
        };
        const state = issues(null, { type: 'FETCH_ISSUES_RESPONSE', payload: [issueRaw] });
        assert.deepEqual(
          state.toJS(),
          [{
            id: 'IssueID',
            user: 'GithubLogin'
          }],
          '`issues()` didn\'t return an empty list when given an empty payload'
        );
      });
    });
  });

  /**
   * Unless there becomes a real need to utilize this suite, leave it 
   * commented out */
  // describe('AboutContainer.js', function() {
  //   /**
  //    * @description - Convenience function that uses proxyquire
  //    * to retrieve the module
  //    * @param {Object=} [{}] overrides
  //    * @returns {Object}
  //    */
  //   function getAboutSeletors(overrides = {}) {
  //     return proxyquire('./AboutSelectors.js', overrides);
  //   }

  //   describe('`mapStateToProps()`', function() {
  //   });

  //   describe('`mapDispatchToProps()`', function() {
  //   });
  // });

  describe('AboutSelectors.js', function() {
    /**
     * @description - Convenience function that uses proxyquire
     * to retrieve the module
     * @returns {Object}
     */
    function getAboutSeletors() {
      return proxyquire('./AboutSelectors.js', {

      });
    }

    describe('`getContributors()`', function() {
      it('Returns a plain JS Array with just the string logins', function() {
        const { getContributors } = getAboutSeletors();
        const state = {
          about: {
            contributors: List([
              Map({
                login: 'GithubLogin',
              }),
              Map({
                login: 'Another GithubLogin'
              }),
            ]),
          },
        };

        const result = getContributors(state);
        assert.deepEqual(
          result,
          ['Another GithubLogin', 'GithubLogin'],
          '`getContributors()` didn\'t return the correct data from the state tree'
        );

      });

      it('Returns an empty JS array when there are no contributors in the store', function() {
        const { getContributors } = getAboutSeletors();
        const state = {
          about: {
            contributors: List([]),
          },
        };

        const result = getContributors(state);
        assert(Array.isArray(result), '`getContributors()` didn\'t return an array');
        assert.equal(result.length, 0, '`getContributors()` didn\'t return an empty array');
      });

      it('Memoizes the output', function() {
        const { getContributors } = getAboutSeletors();
        const state = {
          about: {
            contributors: List([
              Map({
                login: 'GithubLogin',
              }),
              Map({
                login: 'Another GithubLogin'
              }),
            ]),
          },
        };

        /* this function is run in the selecting 'algorithm', 
         * thus we'll use it to determine if the memoization occurs */
        const mapStub = sinon.spy(state.about.contributors, 'map');
        let result = getContributors(state);

        // sanity check
        assert(mapStub.calledOnce, '`contributors.map()` was never called');
        result = getContributors(state);
        assert(mapStub.calledOnce, '`getContributors()` didn\'t memoize');
      });
    });

    describe('getTotalIssues()`', function() {
      it('Returns 0 when there are no issues in the state tree', function() {
        const { getTotalIssues } = getAboutSeletors();

        const state = {
          about: {
            issues: List([])
          }
        };

        const result = getTotalIssues(state);
        assert.equal(result, 0, '`getTotalIssues()` did\'t return 0 despite no existant issues');
      });

      it('Returns the number of issues in the state tree', function() {
        const { getTotalIssues } = getAboutSeletors();

        const state = {
          about: {
            issues: List([
              Map({
                id: 'Some ID',
                user: 'Some User'
              }),
              Map({
                id: 'Another ID',
                user: 'Another User'
              }),
            ]),
          },
        };

        const result = getTotalIssues(state);
        assert.equal(result, 2, '`getTotalIssues()` did\'t return the correct number of issues');
      });
    });

    describe('getTotalCommits()`', function() {
      it('Sums the number of commits from all contributors', function() {
        const { getTotalCommits } = getAboutSeletors();
        const state = {
          about: {
            contributors: List([
              Map({
                login: 'GithubLogin',
                commits: 2
              }),
              Map({
                login: 'Another GithubLogin',
                commits: 1
              }),
            ]),
          },
        };

        const result = getTotalCommits(state);
        assert.equal(result, 3, '`getTotalCommits()` didn\'t sum up the commits correctly');

      });

      it('Returns 0 if there are no contributors in the state tree', function() {
        const { getTotalCommits } = getAboutSeletors();
        const state = {
          about: {
            contributors: List([]),
          },
        };

        const result = getTotalCommits(state);
        assert.equal(result, 0, '`getTotalCommits()` didn\'t return 0 despite no contributors being present');
      });

      it('Memoizes the output', function() {
        const { getTotalCommits } = getAboutSeletors();
        const state = {
          about: {
            contributors: List([
              Map({
                login: 'GithubLogin',
                commits: 2
              }),
              Map({
                login: 'Another GithubLogin',
                commits: 1
              }),
            ]),
          },
        };

        // we'll use this to determine if the selector algorithm ran or not
        const forEachStub = sinon.stub(state.about.contributors, 'forEach');
        let result = getTotalCommits(state);
        
        //sanity check
        assert(forEachStub.calledOnce, '`contributors.forEach()` was never run');

        result = getTotalCommits(state);
        assert(forEachStub.calledOnce, '`getTotalCommits()` didn\'t memoize');
      });
    });
  });
});