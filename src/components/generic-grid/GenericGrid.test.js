
/**
 * Functions that generate test suites for testing model pages
 */

const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const sinon = require('sinon');
const { assert } = require('chai');
const { PAGE_SIZE } = require('../Constants.js');

/**
 * @description - Helper method for requiring a module using
 * proxyquire
 * @param {String} path
 * @param {Object=} [{}] overrides
 * @returns {Module}
 */
function getModule(path, overrides = {}) {
  return proxyquire(path, overrides);
}

/**
 * @description - Creates an entire test suite for a model page
 * @param {String} modelName - i.e. 'game'
 */
function testModelGrid(modelName, ) {
  const modelLower = modelName.toLowerCase();
  const modelCamel = modelLower[0].toUpperCase() + modelLower.slice(1);
  describe.only(`${modelLower}s`, function() {
    describe(`<${modelCamel}s />`, function() {

    });

    describe(`${modelCamel}Actions.js`, function() {
      const getActionsModule = getModule.bind({}, './GenericGridActions.js');
      describe(`\`should${modelCamel}sUpdate()\``, function() {
        const functionName = `\`should${modelCamel}sUpdate()\``;
        const getCreatePredicate = () => getActionsModule().createPredicate;

        it('Returns true if the selector returns an array of size 0', function() {
          const stub = sinon.stub().returns([]);
          const predicate = getCreatePredicate()(stub);

          assert.isOk(predicate(), `${functionName} didn\'t return true`);
        });

        it('Returns true if the selector returns an array smaller than PAGE_SIZE', function() {
          const stub = sinon.stub().returns({ length: PAGE_SIZE - 1 });
          const predicate = getCreatePredicate()(stub);

          assert.isOk(predicate(), `${functionName} didn\'t return true`);
        });

        it('Returns false if the selector returns an array with PAGE_SIZE number of items', function() {
          const stub = sinon.stub().returns({ length: PAGE_SIZE });
          const predicate = getCreatePredicate()(stub);

          assert.isNotOk(predicate(), `${functionName} didn\'t return false`);
        });

        it('Returns false if the selector returns an array with more than PAGE_SIZE items', function() {
          const stub = sinon.stub().returns({ length: PAGE_SIZE + 1 });
          const predicate = getCreatePredicate()(stub);

          assert.isNotOk(predicate(), `${functionName} didn\'t return false`);
        });
      });

      describe(`\`fetch${modelCamel}s()\``, function() {
        const functionName = `\`fetch${modelCamel}s()\``;
        /**
         * @description - Convenience function for retrieving the function
         * that is to be tested
         * @returns {Function}
         */
        function getFetch() {
          return getActionsModule().createFetchModels.apply({}, arguments);
        };

        /**
         * @description - Stubs the `fetch()` function so that
         * we can call it without making an actual request to the
         * internet
         * @param {Function=} [() => {}] fun
         */
        function stubFetch(fun = () => Promise.resolve()) {
          try {
            return sinon.stub(window, 'fetch');
          }
          catch(e) {
            global.fetch = fun;
            return global.fetch;
          }
        }

        /**
         * @description - Restores the fetch function to it's previous state
         */
        function restoreFetch() {
          try {
            window.fetch.restore();
          }
          catch(e) {
            delete global.fetch;
          }
        }

        /**
         * @description - Helper function that will
         * throw errors if the promise catches them
         * @param {Error|Any} data
         */
        function catchError(data) {
          if (data instanceof Error) {
            throw data;
          }
        }

        it('Shouldn\'t fetch if the predicate returns false', function() {
          const predicate = sinon.stub().returns(false);
          const fetchFunction = getFetch(
            predicate,
            null,
            null,
            null,
            // babel does arugment deconstruction before function logic, so this has to be here
            {
              requestAction: null,
              responseAction: null,
              setPageAction: null,
              setTotalPageAction: null,
            },
            [],
          );

          assert.doesNotThrow(fetchFunction().bind({}, sinon.stub(), sinon.stub()), undefined, undefined, '`fetch()` was called');
        });

        it('Should dispatch a request action if predicate returns true', function() {
          const predicate = sinon.stub().returns(true);
          const requestAction = sinon.stub();
          const fetchFunction = getFetch(
            predicate,
            {},
            null,
            null,
            // babel does arugment deconstruction before function logic, so this has to be here
            {
              requestAction,
              responseAction: catchError,
              setPageAction: sinon.stub(),
              setTotalPageAction: sinon.stub(),
            },
            [],
          );

          stubFetch(() => Promise.resolve({ json: () => { return {}; } }));
          const thunk = fetchFunction(0);
          thunk(sinon.stub(), sinon.stub());
          assert(requestAction.called, '`requestAction()` was never called');
          restoreFetch();
        });

        it('Should dispatch SET_TOTAL_PAGES action if the data returned from fetch contains `total_pages`', function(done) {
          const predicate = sinon.stub().returns(true);
          const setTotalPageAction = sinon.stub();
          const module = getActionsModule({
            normalizr: {
              normalize: sinon.stub().returns({
                result: {
                  total_pages: -1,
                },
              }),
            },
          });
          const fetchFunction = module.createFetchModels(
            predicate,
            {},
            null,
            null,
            // babel does arugment deconstruction before function logic, so this has to be here
            {
              requestAction: sinon.stub(),
              responseAction: catchError,
              setPageAction: sinon.stub(),
              setTotalPageAction,
            },
            [],
          );

          stubFetch(() => Promise.resolve({ json: () => {} }));
          const thunk = fetchFunction(0);
          thunk(sinon.stub(), sinon.stub())
            .then(() => {
              assert(setTotalPageAction.called, '`setTotalPageAction()` was never called');
            })
            .catch((err) => Promise.resolve(err))
            .then((err) => {
              restoreFetch();
              if (err && err instanceof Error) {
                return err;
              }

            })
            .then(done);
        });

        it('It should iterate through each of the other models and dispatch their respective actions', function(done) {
          const predicate = sinon.stub().returns(true);
          const action1 = sinon.stub();
          const action2 = sinon.stub();
          const module = getActionsModule({
            normalizr: {
              normalize: sinon.stub().returns({
                entities: {
                  model1: { 1: {}, 2: {}, },
                  model2: { 3: {}, 4: {}, },
                },
              }),
            },
          });
          const fetchFunction = module.createFetchModels(
            predicate,
            {},
            null,
            null,
            // babel does arugment deconstruction before function logic, so this has to be here
            {
              requestAction: sinon.stub(),
              responseAction: catchError,
              setPageAction: sinon.stub(),
              setTotalPageAction: sinon.stub(),
            },
            [
              { secondaryModelName: 'model1', secondaryModelResponseAction: action1, },
              { secondaryModelName: 'model2', secondaryModelResponseAction: action2, },
            ],
          );

          stubFetch(() => Promise.resolve({ json: () => {} }));
          const thunk = fetchFunction(0);
          thunk(sinon.stub(), sinon.stub())
            .then(() => {
              assert(action1.called, '`secondaryModelResponseAction()` was never called for the first secondary model');
              assert.deepEqual(action1.getCall(0).args[0], [{}, {}], '`secondaryModelResponseAction()` had incorrect arguments');
              assert(action2.called, '`secondaryModelResponseAction()` was never called for the first secondary model');
              assert.deepEqual(action2.getCall(0).args[0], [{}, {}], '`secondaryModelResponseAction()` had incorrect arguments');
            })
            .catch((err) => Promise.resolve(err))
            .then((err) => {
              restoreFetch();
              if (err && err instanceof Error) {
                return err;
              }

            })
            .then(done);
        });

        it('Should dispatch a response action for the model in question', function(done) {
          const predicate = sinon.stub().returns(true);
          const responseAction = sinon.stub();
          const module = getActionsModule({
            normalizr: {
              normalize: sinon.stub().returns({
                entities: {
                  model1: { 1: {}, 2: {}, },
                },
              }),
            },
          });
          const fetchFunction = module.createFetchModels(
            predicate,
            {},
            null,
            'model1',
            // babel does arugment deconstruction before function logic, so this has to be here
            {
              requestAction: sinon.stub(),
              responseAction: responseAction,
              setPageAction: sinon.stub(),
              setTotalPageAction: sinon.stub(),
            },
            [],
          );

          stubFetch(() => Promise.resolve({ json: () => {} }));
          const thunk = fetchFunction(0);
          thunk(sinon.stub(), sinon.stub())
            .then(() => {
              assert(responseAction.called, '`responseAction()` was never called for the model');
              assert.deepEqual(responseAction.getCall(0).args[0], [{}, {}], '`responseAction()` had incorrect arguments');
            })
            .catch((err) => Promise.resolve(err))
            .then((err) => {
              restoreFetch();
              if (err && err instanceof Error) {
                return err;
              }

            })
            .then(done);
        });

        it('Should dispatch an error action when the promise fails', function(done) {
          const predicate = sinon.stub().returns(true);
          const responseAction = sinon.stub();
          const module = getActionsModule({
            normalizr: {
              normalize: sinon.stub().throws(),
            },
          });
          const fetchFunction = module.createFetchModels(
            predicate,
            {},
            null,
            'model1',
            // babel does arugment deconstruction before function logic, so this has to be here
            {
              requestAction: sinon.stub(),
              responseAction,
              setPageAction: sinon.stub(),
              setTotalPageAction: sinon.stub(),
            },
            [],
          );

          stubFetch(() => Promise.resolve({ json: () => {} }));
          const thunk = fetchFunction(0);
          thunk(sinon.stub(), sinon.stub())
            .then(() => {
              assert(responseAction.called, '`responseAction()` was never called for the model');
              assert.instanceOf(responseAction.getCall(0).args[0], Error, '`responseAction()` wasn\'t called with an Error');
            })
            .catch((err) => Promise.resolve(err))
            .then((err) => {
              restoreFetch();
              if (err && err instanceof Error) {
                return err;
              }

            })
            .then(done);
        });
      });
    });

    describe(`${modelCamel}Container.js`, function() {

    });

    describe(`${modelCamel}Selectors.js`, function() {

    });
  });
}

module.exports = testModelGrid;
