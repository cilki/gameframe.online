
/**
 * Unit test script for Articles
 */
import Articles from './Articles.js';
const { shallow } = require('enzyme');
const React = require('react');
const { assert } = require('chai');

describe('Articles', () => {
    it("renders without breaking", () => {
        const wrapper = shallow(<Articles/>);
        assert.isDefined(wrapper, '<Articles /> failed to render');
    });
});
