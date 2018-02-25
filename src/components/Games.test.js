
/**
 * Unit test script for Games
 */
import Games from './Games.js';
const { shallow } = require('enzyme');
const React = require('react');
const { expect } = require('chai');

describe('Games', () => {
    it("renders without breaking", () => {
        const wrapper = shallow(<Games/>);
        expect(wrapper).to.exist;
    });
});
