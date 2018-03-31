/**
 * Unit test script for Games
 */

const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const { shallow } = require('enzyme');
const React = require('react');
const sinon = require('sinon');
const { assert } = require('chai');

describe('games', function() {
  describe('<Games />', function() {
    /**
     * @description - Uses proxyquire to retrieve the react component
     * while mocking the relevant dependencies
     * @returns {React.Component}
     */
    function getGames() {
      return proxyquire('./Games.js', {
        'radium': component => component
      }).default;
    }
  });
});
