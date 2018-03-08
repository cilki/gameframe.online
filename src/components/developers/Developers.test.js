
/**
 * Unit test script for Developers
 */
import Developers from './Developers.js';
const { shallow } = require('enzyme');
const React = require('react');
const { expect } = require('chai');

describe('Developers', () => {
    it("renders without breaking", () => {
        const wrapper = shallow(<Developers/>);
        expect(wrapper).to.exist;
    });
});
