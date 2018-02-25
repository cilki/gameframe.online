
/**
 * Unit test script for Navbar
 */
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
const { shallow } = require('enzyme');
const React = require('react');
const { expect } = require('chai');

describe('Navbar', () => {
    it("renders without breaking", () => {
        const wrapper = shallow(<Navbar/>);
        expect(wrapper).to.exist;
    });

    it("has a link to the splash page", () => {
        const wrapper = shallow(<Navbar/>);
        expect(wrapper.contains(<Link to="/">GameFrame.Online</Link>)).to.equal(true);
    });

    it("has a link to the games page", () => {
        const wrapper = shallow(<Navbar/>);
        expect(wrapper.containsMatchingElement(<LinkContainer to={"/games"}><div/></LinkContainer>)).to.exist;
    });

    it("has a link to the developers page", () => {
        const wrapper = shallow(<Navbar/>);
        expect(wrapper.containsMatchingElement(<LinkContainer to={"/developers"}><div/></LinkContainer>)).to.exist;
    });

    it("has a link to the articles page", () => {
        const wrapper = shallow(<Navbar/>);
        expect(wrapper.containsMatchingElement(<LinkContainer to={"/articles"}><div/></LinkContainer>)).to.exist;
    });

    it("has a link to the about page", () => {
        const wrapper = shallow(<Navbar/>);
        expect(wrapper.containsMatchingElement(<LinkContainer to={"/about"}><div/></LinkContainer>)).to.exist;
    });
});