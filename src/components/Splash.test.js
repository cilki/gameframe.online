
/**
 * Unit test script for Splash
 */
import Splash from './Splash.js';
import { Carousel } from 'react-bootstrap';
const { shallow } = require('enzyme');
const React = require('react');
const sinon = require('sinon');
const { expect } = require('chai');

describe('Splash', () => {
    it("renders without breaking", () => {
        const wrapper = shallow(<Splash/>);
        expect(wrapper).to.exist;
    });

    it("has a carousel", () => {
        const wrapper = shallow(<Splash/>);
        expect(wrapper.find(Carousel)).to.have.length(1);
    });

    it("has at least three carousel items", () => {
        const wrapper = shallow(<Splash/>);
        expect(wrapper.find(Carousel.Item).length).to.be.greaterThan(2);
    });
});