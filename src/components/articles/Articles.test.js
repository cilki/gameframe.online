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
  });
});
