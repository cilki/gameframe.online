/**
 * Navbar that allows navigation within the site.
 */

import React from 'react';
import Radium from 'radium';
import {
  Navbar, Nav, NavItem, FormGroup,
  FormControl, Button, Glyphicon,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import NavbarStyles from '../inline-styles/NavbarStyles';

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
    <LinkContainer to={href} {...linkProps} style={{}}>
      <NavItem {...navProps} style={{}}>
        <div style={[NavbarStyles.itemMain]} key={`${href}`}>
          <img
            style={NavbarStyles.navImage}
            key={`${href}-image`}
            src={imageSrc}
            alt={label}
          />
          {label} {/* Just text for now, later on could be it's own component */}
        </div>
      </NavItem>
    </LinkContainer>
  );
}

const pages = [
  {
    href: '/games',
    label: 'Games',
    imageSrc: '../../static/images/ic_videogame_asset_black_48px.svg',
  },
  {
    href: '/developers',
    label: 'Developers',
    imageSrc: '../../static/images/ic_business_center_black_48px.svg',
  },
  {
    href: '/articles',
    label: 'Articles',
    imageSrc: '../../static/images/ic_library_books_black_48px.svg',
  },
  {
    href: '/about',
    label: 'About',
    imageSrc: '../../static/images/ic_info_black_48px.svg',
  },
];

/**
 * @description - NavBar component that contains our react-bootstrap navbar with react-router links
 * @param {Object] props}
 */
function NavBar() {
  return (
    <Navbar inverse collapseOnSelect style={ NavbarStyles.main }>
      <Navbar.Header>
        <Navbar.Brand>
          <div style={[ NavbarStyles.brandContainer ]}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <img
                src='../../static/images/logo_black.svg'
                alt='GameFrame.Online'
                style={[ NavbarStyles.brandImage ]}
              />
            </Link>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullLeft>
          {
            /* This dynamically creates all of the NavItems for
             * us depending on the objects in `pages` */
          }
          {
            pages.map((page, index) => createLinkContainerNavItem(
              page.href,
              page.imageSrc,
              page.label,
              { key: page.href },
              { eventKey: index },
            ))
          }
        </Nav>
        <Navbar.Form pullRight>
          <FormGroup>
            <div style={{ display: 'flex' }}>
              <FormControl type="text" placeholder="Search" style={{borderRadius: '0'}}/>
              <Button style={{borderRadius: '0'}}>
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

export default Radium(NavBar);
