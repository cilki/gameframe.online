/**
 * Testing script for the About component and subcomponents.
 */

const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const sinon = require('sinon');
const { assert } = require('chai');
const { shallow } = require('enzyme');
const React = require('react');
const { Map, List } = require('immutable');

describe('group-member', function() {
  describe('<GroupMember />', function() {
    /**
     * @description - Uses proxyquire to retrieve the React component
     * while mocking relevant dependencies.
     * @returns {Component}
     */
    function getGroupMemberComponent() {
      return proxyquire('./GroupMember', {
        radium: component => component
      }).default;
    }

    it('Calls `fetchStats()` when it mounts', function() {
      const GroupMember = getGroupMemberComponent();
      const fetchStatsStub = sinon.stub();

      const wrapper = shallow(<GroupMember fetchStats={fetchStatsStub} login={''} />);

      assert(fetchStatsStub.called, '`fetchStats()` was never called');
    });
  });

  describe('GroupMemberContainer.js', function() {
    /**
     * @description - Convenience function that uses proxyquire to retrieve
     * the GroupMemberContainer module.
     * @param {Function=} [() => {}] makeGetContributorStub
     * @param {Function=} [() => {}] fetchGroupMemberStatsStub
     * @returns {Object}
     */
    function getGroupMemberContainer(
      makeGetContributorStub = () => {},
      fetchGroupMemberStatsStub = () => {}
    ) {
      return proxyquire('./GroupMemberContainer.js', {
        './GroupMemberSelectors': {
          makeGetContributor: makeGetContributorStub,
        },
        './GroupMemberActions': {
          fetchGroupMemberStats: fetchGroupMemberStatsStub
        },
      });
    }

    describe('`mapStateToProps()`', function() {
      it('It returns a function that returns an object that copies all propertries from `makeGetContributor()`', function() {
        const fakeProperties = {
          prop1: 0,
          prop2: 1,
        };

        const makeGetContributorStub = sinon.stub().returns(() => fakeProperties);
        const { mapStateToProps } = getGroupMemberContainer(makeGetContributorStub);

        const fun = mapStateToProps();
        const result = fun();

        assert.deepEqual(result,
          fakeProperties,
          'the function returned from `mapStateToProps()` didn\'t return the correct properties'
        );
        assert.notStrictEqual(
          result,
          fakeProperties,
          'the function returned from `mapStateToProps()` returned a direct copy of the selector'
        );
      });
    });

    describe('`mapDispatchToProps()`', function() {
      it('Returns an object with the correct `fetchStats()` function', function() {
        const  fetchGroupMemberStatsStub = sinon.stub();
        const { mapDispatchToProps } = getGroupMemberContainer(() => {}, fetchGroupMemberStatsStub);

        const result = mapDispatchToProps(() => {}, {});

        assert.isDefined(result.fetchStats, '`fetchStats()` isn\'t defined');
        result.fetchStats();
        assert(fetchGroupMemberStatsStub.called, '`fetchGroupMemberStats()` was never called');
      });
    });
  });

  describe('GroupMemberActions.js', function() {
    let fetchStub;

    /**
     * @description - Uses proxyquire to retrieve the actions
     * file while mocking relevant dependencies.
     * @param {Function=} [() => {}] getContributorStub
     * @returns {Object}
     */
    function getGroupMemberActions(getContributorStub = () => {}) {
      return proxyquire('./GroupMemberActions.js', {
        './GroupMemberSelectors': {
          getContributor : getContributorStub
        }
      });
    }

    /**
     * @description - Mocks the `fetch()` function. This
     * has to be done in a semi-hacky fashion as the fetch
     * function isn't defined in a NodeJS environment, but
     * should succeed if it's being run in a browser environment.
     */
    function stubFetch() {
      try {
        fetchStub = sinon.stub(window, 'fetch');
      }
      catch (err) {
        fetchStub = sinon.stub();
        global.fetch = fetchStub;
      }
    }

    /**
     * @description - Restores the `fetch()` function to its
     * original state. This is necessary so that we get a "clean slate"
     * after each test as well as if any other tests want to mock fetch.
     */
    function restoreFetch() {
      try {
        window.fetch.restore();
      }
      catch (err) {
        delete global.fetch;
      }
    }

    beforeEach(function() {
      stubFetch();
    });

    afterEach(function() {
      restoreFetch();
    });

    describe('`shouldFetchStats()`', function() {
      it('Returns false if there `getContributor()` returns null', function() {
        const getContributorStub = sinon.stub().returns(null);
        const { shouldFetchStats } = getGroupMemberActions(getContributorStub);

        assert.equal(shouldFetchStats(), false, '`shouldFetchStats()` didn\'t return false');
      });

      it('Returns true if `getContributor()` returns a Map that doesn\'t have a name', function() {
        const contributor = Map({
          // no name
        });
        const getContributorStub = sinon.stub().returns(contributor);
        const { shouldFetchStats } = getGroupMemberActions(getContributorStub);

        assert.equal(shouldFetchStats(), true, '`shouldFetchStats()` didn\'t return true');
      });

      it('Returns false if `getContributor()` returns a Map that does have a name', function() {
        const contributor = Map({
          name: 'Person Name'
        });
        const getContributorStub = sinon.stub().returns(contributor);
        const { shouldFetchStats } = getGroupMemberActions(getContributorStub);

        assert.equal(shouldFetchStats(), false, '`shouldFetchStats()` didn\'t return false');
      });
    });

    describe('`fetchJSONFile()`', function() {
      it('Doesn\'t fetch anything if the predicate returns false', function() {
        const { fetchJSONFile } = getGroupMemberActions();
        const predicateStub = sinon.stub().returns(false);

        const fun = fetchJSONFile('', predicateStub, () => {}, () => {});
        fun(() => {}, () => {});
        assert(fetchStub.notCalled, '`fetch()` was called despite the predicate returning false');
      });

      it('Dispatches a request action if the predicate returns true', function() {
        const { fetchJSONFile } = getGroupMemberActions();
        const predicateStub = sinon.stub().returns(true);
        const requestActionStub = sinon.stub();
        
        fetchStub = fetchStub.returns(Promise.resolve({
          json: () => {}
        }));

        const fun = fetchJSONFile('', predicateStub, requestActionStub, () => {});
        fun(() => {}, () => {});
        assert(requestActionStub.called, '`requestAction()` was never called');
      });

      it('Dispatches a response action with a JS object', function(done) {
        const { fetchJSONFile } = getGroupMemberActions();
        const predicateStub = sinon.stub().returns(true);
        const responseActionStub = sinon.stub();
        
        // Have to create the variable because we need to reference it later.
        const data = {};
        fetchStub = fetchStub.returns(Promise.resolve({
          json: () => data
        }));

        const fun = fetchJSONFile('', predicateStub, () => {}, responseActionStub);
        fun(() => {}, () => {})
          .then(() => {
            assert(responseActionStub.called, '`responseAction()` was never called');
            assert(responseActionStub.getCall(0).calledWith(data), '`responesAction()` wasn\'t called with the returned JSON object');    
          })
          .catch((err) => Promise.resolve(err))
          .then(done);
      });

      it('Dispatches a response action with an error payload if the promise throws an error', function(done) {
        const { fetchJSONFile } = getGroupMemberActions();
        const predicateStub = sinon.stub().returns(true);
        const responseActionStub = sinon.stub();
        
        // Have to create the variable because we need to reference it later.
        const error = new Error();
        fetchStub = fetchStub.returns(Promise.resolve({
          json: () => {
            throw error;
          }
        }));

        const fun = fetchJSONFile('', predicateStub, () => {}, responseActionStub);
        fun(() => {}, () => {})
          .then(() => {
            assert(responseActionStub.called, '`responseAction()` was never called');
            assert(responseActionStub.getCall(0).calledWith(error), '`responesAction()` wasn\'t called with the thrown error object');
          })
          .catch((err) => Promise.resolve(err))
          .then(done);
      });
    });
    describe('`fetchGroupMemberStats()`', function() {
      it('Binds the predicate correctly with the given login', function() {
        const getContributorStub = sinon.stub().returns(null);
        const state = {};
        const { fetchGroupMemberStats } = getGroupMemberActions(getContributorStub);

        /**
         * Since we're just testing the binding, we WANT the predicate (`shouldFetchStats()`) to 
         * return FALSE. Otherwise we'd have to mock up `fetch()` no more for something not
         * relevant to this test.
         */
        const fun = fetchGroupMemberStats('GithubLogin');
        fun(() => {}, () => state);

        assert(getContributorStub.called, '`getContributor()` was never called');
        const call = getContributorStub.getCall(0);
        const callArgs = call.args;
        const _state = callArgs[0];
        const _props = callArgs[1];

        assert.strictEqual(_state, state, 'the \'state\' parameter to `getContributor()` is incorrect');
        assert.deepEqual(_props, { login: 'GithubLogin' }, 'the \'props\' parameter to `getContributor()` is incorrect');
      });

      it('Inserts the login into the URL correctly', function(done) {
        const getContributorStub = sinon.stub().returns(Map({
          login: 'GithubLogin'
        }));
        const { fetchGroupMemberStats } = getGroupMemberActions(getContributorStub);

        fetchStub = fetchStub.returns(Promise.resolve({
          json: () => {}
        }));

        const fun = fetchGroupMemberStats('GithubLogin');
        fun(() => {}, () => {})
          .then(() => {
            assert(fetchStub.called, '`fetch()` was never called');
            const urlArg = fetchStub.getCall(0).args[0];
            assert.include(urlArg, 'GithubLogin', 'the url passed to `fetch()` didn\'t include the given login');
          })
          .catch((err) => Promise.resolve(err))
          .then(done);
      });

      it('Binds the \'fetchStatsRequest\' action correctly', function(done) {
        const getContributorStub = sinon.stub().returns(Map({
          login: 'GithubLogin'
        }));
        const { fetchGroupMemberStats } = getGroupMemberActions(getContributorStub);

        fetchStub = fetchStub.returns(Promise.resolve({
          json: () => {}
        }));
        const dispatchStub = sinon.stub();

        const fun = fetchGroupMemberStats('GithubLogin');
        fun(dispatchStub, () => {})
          .then(() => {
            // Sanity checks.
            assert(fetchStub.called, '`fetch()` was never called');
            assert(dispatchStub.called, '`dispatch()` was never called');

            const firstDispatchArg = dispatchStub.getCall(0).args[0];
            assert.deepEqual(
              firstDispatchArg,
              { type: 'FETCH_STATS_REQUEST', payload: 'GithubLogin'},
              '`dispatch()` wasn\'t given the correct payload from `fetchStatsRequest()`'
            );
          })
          .catch((err) => Promise.resolve(err))
          .then(done);
      });

      it('Binds the \'fetchStatsResponse\' action correctly when the fetch is successful', function(done) {
        const getContributorStub = sinon.stub().returns(Map({
          login: 'GithubLogin'
        }));
        const { fetchGroupMemberStats } = getGroupMemberActions(getContributorStub);

        const data = { data: 'some random data to check for equality' };
        fetchStub = fetchStub.returns(Promise.resolve({
          json: () => data
        }));
        const dispatchStub = sinon.stub();

        const fun = fetchGroupMemberStats('GithubLogin');
        fun(dispatchStub, () => {})
          .then(() => {
            // Sanity checks.
            assert(fetchStub.called, '`fetch()` was never called');
            assert(dispatchStub.calledTwice, '`dispatch()` wasn\'t enough times');

            const firstDispatchArg = dispatchStub.getCall(1).args[0];
            assert.deepEqual(
              firstDispatchArg,
              {
                type: 'FETCH_STATS_RESPONSE',
                payload: {
                  login: 'GithubLogin',
                  data: data
                }
              },
              '`dispatch()` wasn\'t given the correct payload from `fetchStatsResponse()`'
            );
          })
          .catch((err) => Promise.resolve(err))
          .then(done);
      });

      it('Binds the \'fetchStatsResponse\' action correctly when the fetch is unsuccessful', function(done) {
        const getContributorStub = sinon.stub().returns(Map({
          login: 'GithubLogin'
        }));
        const { fetchGroupMemberStats } = getGroupMemberActions(getContributorStub);

        const error = new Error();
        fetchStub = fetchStub.returns(Promise.resolve({
          json: () => {
            throw error;
          }
        }));
        const dispatchStub = sinon.stub();

        const fun = fetchGroupMemberStats('GithubLogin');
        fun(dispatchStub, () => {})
          .then(() => {
            // Sanity checks.
            assert(fetchStub.called, '`fetch()` was never called');
            assert(dispatchStub.calledTwice, '`dispatch()` wasn\'t enough times');

            const firstDispatchArg = dispatchStub.getCall(1).args[0];
            assert.deepEqual(
              firstDispatchArg,
              {
                type: 'FETCH_STATS_RESPONSE',
                payload: {
                  login: 'GithubLogin',
                  data: error,
                  error: true
                }
              },
              '`dispatch()` wasn\'t given the correct payload from `fetchStatsResponse()`'
            );
          })
          .catch((err) => Promise.resolve(err))
          .then(done);
      });
    });
  });

  describe('GroupMemberSelectors.js', function() {
    /**
     * @description - Uses proxyquire to mock dependencies and
     * retrieve the module.
     * @param {Function=} [() => {}] getAllContributorsStub
     * @param {Function=} [() => {}] getIssuesStub
     */
    function getGroupMemberSelectors(
      getAllContributorsStub = () => {},
      getIssuesStub = () => {}
    ) {
      return proxyquire('./GroupMemberSelectors.js', {
        '../about/AboutSelectors': {
          getAllContributors: getAllContributorsStub,
          getIssues: getIssuesStub
        }
      });
    }

    /**
     * @description - Convencience function for retrieving the module
     * for testing the `getContributor()` function.
     * @param {Map} state
     */
    function getGroupMemberSelectorsWithState(state) {
      const getAllContributorsStub = sinon.stub().returns(state.get('contributors'));
      const getIssuesStub = sinon.stub().returns(state.get('issues'));

      return getGroupMemberSelectors(getAllContributorsStub, getIssuesStub);
    }

    describe('`getContributor()`', function() {
      it('Returns null when there are no contributors in the state tree', function() {
        const state = Map({
          contributors: List(),
        });
        const { getContributor } = getGroupMemberSelectorsWithState(state);

        const contributor = getContributor(state, { login: '' });
        assert.isNull(contributor, '\'contributor\' is not  null');
      });

      it('Returns the correct contributor when given a login that matches a contributor from list in the state tree', function() {
        const state = Map({
          contributors: List([
            Map({
              login: 'GithubLogin'
            })
          ]),
        });
        const { getContributor } = getGroupMemberSelectorsWithState(state);

        const contributor = getContributor(state, { login: 'GithubLogin' });
        assert.isNotNull(contributor, '\'contributor\' is  null');
      });

      it('Returns null when given a login that doesn\'t match any contributor from the list in the state tree', function() {
        const state = Map({
          contributors: List([
            Map({
              login: 'GithubLogin'
            })
          ]),
        });
        const { getContributor } = getGroupMemberSelectorsWithState(state);

        const contributor = getContributor(state, { login: 'NotGithubLogin' });
        assert.isNull(contributor, '\'contributor\' is  not null');
      });
    });

    describe('`makeGetContributor()`', function() {
      it('Returns null when given a login with no matching model in the state tree', function() {
        const state = Map({
          contributors: List([]),
          issues: List([])
        });

        const { getContributor } = getGroupMemberSelectorsWithState(state);
        const contributor = getContributor(state, { login: 'GithubLogin' });
        assert.isNull(contributor, '\'contributor\' is  not null');
      });

      it('Adds all of the issues with the given contributor\'s login and returns the contributor with an extra attribute', function() {
        const state = Map({
          contributors: List([
            Map({
              login: 'GithubLogin'
            }),
            Map({
              login: 'AnotherGithubLogin'
            })
          ]),
          issues: List([
            Map({
              user: 'GithubLogin'
            }),
            Map({
              user: 'AnotherGithubLogin'
            }),
            Map({
              user: 'GithubLogin'
            })
          ])
        });

        const { makeGetContributor } = getGroupMemberSelectorsWithState(state);

        let getContributorSelector = makeGetContributor(),
          contributor = getContributorSelector(state, { login: 'GithubLogin' });
        // Don't need `get('issues')` here, as this returns a plain JS object.
        assert.equal(contributor.issues, 2, '\'issues\' isn\'t equal to 2');
        assert.equal(contributor.login, 'GithubLogin', '\'login\' was lost from the selector');

        // In order to correctly memoize, we need to create another selector.
        getContributorSelector = makeGetContributor();
        contributor = getContributorSelector(state, { login: 'AnotherGithubLogin' });
        assert.equal(contributor.issues, 1, '\'issues\' isn\'t equal to 1');
        assert.equal(contributor.login, 'AnotherGithubLogin', '\'login\' was lost from the selector');
      });

      it('Memoizes the output', function() {
        const user = Map({
          login: 'GithubLogin'
        });

        /**
         * The way to tell if the selector's function was ran again
         * is to spy and see if our user's `set()` function was used.
         */
        sinon.spy(user, 'set');

        const state = Map({
          contributors: List([
            user
          ]),
          issues: List([])
        });

        const { makeGetContributor } = getGroupMemberSelectorsWithState(state);

        const getContributorSelector = makeGetContributor();
        getContributorSelector(state, { login: 'GithubLogin' });

        // Sanity-check.
        assert(user.set.called, '`user.set()` was never called');

        for (let i = 0; i < 3; ++i) {
          getContributorSelector(state, { login: 'GithubLogin' });
          // Despite repeated attempts at the selector, we aren't running the computing function.
          assert(user.set.calledOnce, '`user.set()` was called more than once');
        }
      });
    });
  })
});
