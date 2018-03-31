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
  });
});
