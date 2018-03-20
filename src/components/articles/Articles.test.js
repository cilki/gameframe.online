/**
 * Unit test script for Articles
 */

const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const { shallow } = require('enzyme');
const React = require('react');
const sinon = require('sinon');
const { assert } = require('chai');
const { List, Map } = require('immutable');

describe('articles', function() {
  describe('<Articles />', function() {
    /**
     * @description - Uses proxyquire to retrieve the react component
     * while mocking the relevant dependencies
     * @returns {React.Component}
     */
    function getArticles() {
      return proxyquire('./Articles.js', {
        'radium': component => component
      }).default;
    }
  
    /**
     * Test generator for `<Articles />`'s prop functions
     */
    const propFunction = ['fetchArticles'];
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
      
        const Articles = getArticles();
        const wrapper = shallow(
          <Articles
            currentPage={1}
            totalPages={1}
            {...requiredProps}
          />
        );
        assert(propStub.called, '`' + fun + '()` was never called');
      });
    }
  });
  
  describe('ArticlesActions.js', function() {
    /**
     * @description - Retrieves Articles modules with a clean slate
     * @param {Object=} [{}] overrides
     * @returns {Object}
     */
    function getArticlesActions(overrides = {}) {
      return proxyquire('./ArticlesActions.js', overrides);
    }
    
    describe('`shouldFetchArticles()`', function() {
      // PAGE_SIZE = 12
      it('Returns true if `getArticlesByPage(state, pageNumber).length` < PAGE_SIZE', function() {
        const getArticlesStub = sinon.stub().returns([]);
        const { shouldFetchArticles } = getArticlesActions({
          './ArticlesSelectors': {
            getArticlesByPage: getArticlesStub
          }
        });
        const f = shouldFetchArticles();
        assert.equal(f, true, '`shouldFetchArticles(...)` returned false');
      });
      
      it('Returns true if `getArticlesByPage(state, pageNumber).length` < PAGE_SIZE', function() {
        const getArticlesStub = sinon.stub().returns([1, 2, 3]);
        const { shouldFetchArticles } = getArticlesActions({
          './ArticlesSelectors': {
            getArticlesByPage: getArticlesStub
          }
        });
        const f = shouldFetchArticles();
        assert.equal(f, true, '`shouldFetchArticles(...)` returned false');
      });
      
      it('Returns false if `getArticlesByPage(state, pageNumber).length` >= PAGE_SIZE', function() {
        const getArticlesStub = sinon.stub().returns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        const { shouldFetchArticles } = getArticlesActions({
          './ArticlesSelectors': {
            getArticlesByPage: getArticlesStub
          }
        });
        const f = shouldFetchArticles();
        assert.equal(f, false, '`shouldFetchArticles(...)` returned true');
      });

      it('Returns false if `getArticlesByPage(state, pageNumber).length` >= PAGE_SIZE', function() {
        const getArticlesStub = sinon.stub().returns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
        const { shouldFetchArticles } = getArticlesActions({
          './ArticlesSelectors': {
            getArticlesByPage: getArticlesStub
          }
        });
        const f = shouldFetchArticles();
        assert.equal(f, false, '`shouldFetchArticles(...)` returned true');
      });       
    });
    
    describe('`articlesRequested()`', function() {
      it('Returns true when dispatched an \'FETCH_ARTICLES_REQUEST\' action', function() {
        const { articlesRequested } = getArticlesActions();
        const f = articlesRequested(null, { type: 'FETCH_ARTICLES_REQUEST' });
        assert.equal(f, true, '`articlesRequested()` didn\'t reduce the action correctly');
      });
      
      it('Returns false when dispatched an \'FETCH_ARTICLES_RESPONSE\' action', function() {
        const { articlesRequested } = getArticlesActions();
        const f = articlesRequested(null, { type: 'FETCH_ARTICLES_RESPONSE' });
        assert.equal(f, false, '`articlesRequested()` didn\'t reduce the action correctly');
      });
    });
    
    describe('`articlesError()`', function() {
      it('Returns null when given a successful \'FETCH_ARTICLES_RESPONSE\' action', function() {
        const { articlesError } = getArticlesActions();
        const f = articlesError(true, { type: 'FETCH_ARTICLES_RESPONSE', payload: 'articles'});
        assert.isNull(f, '`articlesError()` didn\'t reduce the action correctly');
      });
      
      it('Returns the error string when given an error in a \'FETCH_ARTICLES_RESPONSE\' action', function() {
        const { articlesError } = getArticlesActions();
        const f = articlesError(true, { type: 'FETCH_ARTICLES_RESPONSE', payload: new Error('error'), error: true});
        assert.equal(f, 'error', '`articlesError()` didn\'t reduce the error action correctly');
      });
    });
  });
});
