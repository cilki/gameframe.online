
/**
 * Unit test script for Navbar
 */
const Navbar = require('./Navbar.js').default;
const { Link } = require('react-router-dom');
const { LinkContainer } = require('react-router-bootstrap');
const { shallow } = require('enzyme');
const React = require('react');
const { assert } = require('chai');

describe('Navbar', () => {
  it("renders without breaking", () => {
    const wrapper = shallow(
      <Navbar
        fetchGamesCount={() => {}}
        fetchDevelopersCount={() => {}}
        fetchArticlesCount={() => {}}
      />
    );
    assert.isDefined(wrapper, '<Navbar /> didn\'t render correctly');
  });

  it('has a link to the splash page', function() {
    const wrapper = shallow(
      <Navbar
        fetchGamesCount={() => {}}
        fetchDevelopersCount={() => {}}
        fetchArticlesCount={() => {}}
      />
    );
    assert.equal(
      wrapper.find('[to="/"]').length,
      1,
      '<Navbar /> didn\'t have a link to the Splash page' 
    );
  });

  const links = [
    'games',
    'developers',
    'articles',
    'about'
  ];

  for (let link of links) {
    it(`has a link to the ${link} page`, function() {
      const wrapper = shallow(
        <Navbar
          fetchGamesCount={() => {}}
          fetchDevelopersCount={() => {}}
          fetchArticlesCount={() => {}}
        />
      );
      assert.equal(
        wrapper.find(`[to="/${link}"]`).length,
        1,
        `<Navbar /> didn\'t have a link to the ${link} page` 
      );
    });
  }
});
