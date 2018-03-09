/**
 * Navbar that allows navigation within the site.
 */

import React from 'react';
import {
  Navbar, Nav, Brand, Toggle, NavItem, Forms, FormGroup,
  FormControl, Button, Image, Glyphicon
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

/**
 * @description - Function that generates a LinkContainer for the Navbar
 * @param {String} href - the location to redirect
 * @param {String} label - the text to display to the user. Eventually
 *  we'll probably pass in a component here that will accept some extra styling
 *  in order to customize what each NavItem looks like depending on the current
 *  router
 * @param {Object} linkProps - extra props (such as key) that would need to be
 *  given to the
 *  outlying LinkContainer component
 * @param {Object} navProps - Extra props (such as eventKey) that need to be
 *  placed within the NavItem
 * @returns {React.Component}
 */
function createLinkContainerNavItem(href, imageSrc, label, linkProps, navProps) {
  return (
    <LinkContainer to={href} {...linkProps}>
      <NavItem {...navProps}>
        <img style={{
          maxWidth: '24px',
          maxHeight: '24px',
          filter: 'grayscale(100%) invert(100%)',
          paddingRight: '4px',
          }}
          src={imageSrc}
        />
        {label} {/* Just text for now, later on should be it's own component */}
      </NavItem>
    </LinkContainer>
  );
}

const pages = [
  {
    href: '/games',
    label: 'Games',
    imageSrc: '../../static/images/icons8-white-game-controller-50.png',
  },
  {
    href: '/developers',
    label: 'Developers',
    imageSrc: '../../static/images/icons8-white-development-skill-50.png',
  },
  {
    href: '/articles',
    label: 'Articles',
    imageSrc: '../../static/images/icons8-white-hot-article-50.png',
  },
  {
    href: '/about',
    label: 'About',
    imageSrc: '../../static/images/icons8-white-about-50.png',
  },
];

/**
 * NavBar class that contains our react-bootstrap navbar with react-router links
 */
class NavBar extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect style={{
        borderRadius: '0',
        background: '#272727',
        borderLeft: 'none',
        borderRight: 'none',
        marginBottom: '0'
        }}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">GameFrame.Online</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft={true}>
            {/* This dynamically creates all of the NavItems for us depending on the objects in `pages` */}
            {pages.map((page, index) => createLinkContainerNavItem(page.href, page.imageSrc, page.label, { key: page.href }, { eventKey: index }, ))}
          </Nav>
          <Navbar.Form pullRight>
            <FormGroup>
            <div style={{display: 'flex'}}>
              <FormControl type="text" placeholder="Search" />
                <Button>
                  <Glyphicon glyph="search" />
                </Button>
              </div>
            </FormGroup>
            {' '}
          </Navbar.Form>
          </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
