
/**
 * Unit test script for Developers
 */
import Developers from './Developers.js';
const { shallow } = require('enzyme');
const React = require('react');
const { assert } = require('chai');

describe('Developers', () => {
    it("renders without breaking", () => {
        const wrapper = shallow(<Developers/>);

        assert.isDefined(wrapper, '<Developers /> didn\'t render');
    });
});
