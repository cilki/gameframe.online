
/**
 * Unit test script for Articles
 */
import Articles from './Articles.js';
const { shallow } = require('enzyme');
const React = require('react');
const { expect } = require('chai');

describe('Articles', () => {
    it("renders without breaking", () => {
        const wrapper = shallow(
          <Articles
            currentPage={1}
            totalPages={1}
            fetchArticles={() => {}}
          />
        );
        expect(wrapper).to.exist;
    });
});
