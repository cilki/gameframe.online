/**
 * Unit test script for Developers
 */

const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const { shallow } = require('enzyme');
const React = require('react');
const sinon = require('sinon');
const { assert } = require('chai');
const { List, Map } = require('immutable');

describe('developers', function() {
  describe('<Developers />', function() {
    /**
     * @description - Uses proxyquire to retrieve the react component
     * while mocking the relevant dependencies
     * @returns {React.Component}
     */
    function getDevelopers() {
      return proxyquire('./Developers.js', {
        'radium': component => component
      }).default;
    }
  
    /**
     * Test generator for `<Developers />`'s prop functions
     */
    const propFunction = ['fetchDevelopers'];
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
      
        const Developers = getDevelopers();
        const wrapper = shallow(
          <Developers
            currentPage={1}
            totalPages={1}
            {...requiredProps}
          />
        );
        assert(propStub.called, '`' + fun + '()` was never called');
      });
    }
  });
  
  describe('DevelopersActions.js', function() {
    /**
     * @description - Retrieves Developers modules with a clean slate
     * @param {Object=} [{}] overrides
     * @returns {Object}
     */
    function getDevelopersActions(overrides = {}) {
      return proxyquire('./DevelopersActions.js', overrides);
    }
    
    describe('`shouldFetchDevelopers()`', function() {
      // PAGE_SIZE = 12
      it('Returns true if `getDevelopersByPage(state, pageNumber).length` < PAGE_SIZE', function() {
        const getDevelopersStub = sinon.stub().returns([]);
        const { shouldFetchDevelopers } = getDevelopersActions({
          './DevelopersSelectors': {
            getDevelopersByPage: getDevelopersStub
          }
        });
        const f = shouldFetchDevelopers();
        assert.equal(f, true, '`shouldFetchDevelopers(...)` returned false');
      });
      
      it('Returns true if `getDevelopersByPage(state, pageNumber).length` < PAGE_SIZE', function() {
        const getDevelopersStub = sinon.stub().returns([1, 2, 3]);
        const { shouldFetchDevelopers } = getDevelopersActions({
          './DevelopersSelectors': {
            getDevelopersByPage: getDevelopersStub
          }
        });
        const f = shouldFetchDevelopers();
        assert.equal(f, true, '`shouldFetchDevelopers(...)` returned false');
      });
      
      it('Returns false if `getDevelopersByPage(state, pageNumber).length` >= PAGE_SIZE', function() {
        const getDevelopersStub = sinon.stub().returns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        const { shouldFetchDevelopers } = getDevelopersActions({
          './DevelopersSelectors': {
            getDevelopersByPage: getDevelopersStub
          }
        });
        const f = shouldFetchDevelopers();
        assert.equal(f, false, '`shouldFetchDevelopers(...)` returned true');
      });

      it('Returns false if `getDevelopersByPage(state, pageNumber).length` >= PAGE_SIZE', function() {
        const getDevelopersStub = sinon.stub().returns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
        const { shouldFetchDevelopers } = getDevelopersActions({
          './DevelopersSelectors': {
            getDevelopersByPage: getDevelopersStub
          }
        });
        const f = shouldFetchDevelopers();
        assert.equal(f, false, '`shouldFetchDevelopers(...)` returned true');
      });       
    });
    
    describe('`developersRequested()`', function() {
      it('Returns true when dispatched an \'FETCH_DEVELOPERS_REQUEST\' action', function() {
        const { developersRequested } = getDevelopersActions();
        const f = developersRequested(null, { type: 'FETCH_DEVELOPERS_REQUEST' });
        assert.equal(f, true, '`developersRequested()` didn\'t reduce the action correctly');
      });
      
      it('Returns false when dispatched an \'FETCH_DEVELOPERS_RESPONSE\' action', function() {
        const { developersRequested } = getDevelopersActions();
        const f = developersRequested(null, { type: 'FETCH_DEVELOPERS_RESPONSE' });
        assert.equal(f, false, '`developersRequested()` didn\'t reduce the action correctly');
      });
    });
    
    describe('`developersError()`', function() {
      it('Returns null when given a successful \'FETCH_DEVELOPERS_RESPONSE\' action', function() {
        const { developersError } = getDevelopersActions();
        const f = developersError(true, { type: 'FETCH_DEVELOPERS_RESPONSE', payload: 'developers'});
        assert.isNull(f, '`developersError()` didn\'t reduce the action correctly');
      });
      
      it('Returns the error string when given an error in a \'FETCH_DEVELOPERS_RESPONSE\' action', function() {
        const { developersError } = getDevelopersActions();
        const f = developersError(true, { type: 'FETCH_DEVELOPERS_RESPONSE', payload: new Error('error'), error: true});
        assert.equal(f, 'error', '`developersError()` didn\'t reduce the error action correctly');
      });
    });
  });
});
