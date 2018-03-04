/**
 * Navbar that allows navigation within the site.
 */

import React from 'react';
import Radium from 'radium';
import {
  Navbar, Nav, Brand, Toggle, NavItem, Forms, FormGroup,
  FormControl, Button, Image, Glyphicon, Tooltip, OverlayTrigger,
  Dropdown
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

/**
 * @description - Function that generates a LinkContainer for the Navbar
 * @param {String} href - the location to redirect
 * @param {String} label - the text to display to the user. Eventually
 * 	we'll probably pass in a component here that will accept some extra styling
 * 	in order to customize what each NavItem looks like depending on the current
 * 	router
 * @param {Object} linkProps - extra props (such as key) that would need to be
 * 	given to the
 * 	outlying LinkContainer component
 * @param {Object} navProps - Extra props (such as eventKey) that need to be
 * 	placed within the NavItem
 * @returns {React.Component}
 */
function createLinkContainerNavItem(href, imageSrc, label, linkProps, navProps) {
  return (
    <div style={{
      display: 'flex',
        padding: '4px 12% 4px 12%',
      }}
    >
      <LinkContainer to={href} {...linkProps} style={{
        }}
      >
        <div style={{
          
          }}
        >
          <NavItem {...navProps} style={{
            }}
          >
            <OverlayTrigger placement='bottom' overlay={
              <Tooltip id="tooltip">
                {label}
              </Tooltip>
            }>
  		    <img style={{
              position: 'relative',
              margin: 'auto',
              display: 'block',
              minWidth: '16px',
              minHeight: '16px',
              maxWidth: '32px',
              maxHeight: '32px',
              filter: 'saturate(0%) invert(100%)',
              }} src={imageSrc}
            /></OverlayTrigger>
          </NavItem>
        </div>
      </LinkContainer>
    </div>
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
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexWrap: 'nowrap',
        background: 'linear-gradient(black, #222)',
        verticalAlign:'middle',
        }}
      >
        <Link to="/" className='navbar-toggle' data-toggle='collapse'>
          <img style={{
            width: '30px',
            height: '24px',
            padding: '0px 4px 0px 4px',
            alignItem: 'center'
            }}
            src='../../static/images/mininavbarlogo.png'
            alt='GameFrame.Online'
          />
        </Link>
        <Navbar.Collapse>
          <div style={{
            }}
          >
            <Link to="/">
              <img style={{
                width: '148px',
                height: '40px',
                padding: '4px 4px 4px 4px',
                alignItem: 'center'
                }}
                src='../../static/images/navbarlogo.png'
                alt='GameFrame.Online'
              />
            </Link>
          </div>
        </Navbar.Collapse>
        <div style={{
            alignSelf: 'flex-start',
            flexGrow: '1'
          }}
        >
          <Navbar.Collapse>
            <Nav pullLeft={true}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                maxWidth: '100%',
                alignItem: 'center'
                }}
              >
                {/* This dynamically creates all of the NavItems for us depending on the objects in `pages` */}
                {pages.map((page, index) => createLinkContainerNavItem(page.href, page.imageSrc, page.label, { key: page.href }, { eventKey: index }, ))}
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
        <div style={{}}>
        <img className='navbar-toggle' data-toggle='collapse'
          style={{
          width: '30px',
          height: '24px',
          padding: '0px 4px 0px 4px',
          alignItem: 'flex-end'
          }}
          src='../../static/images/mininavbarlogo.png'
          alt='GameFrame.Online'
        />
          <Navbar.Collapse>
            <Navbar.Form>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
                <Button>
                  <Glyphicon glyph="search" />
                </Button>
              </FormGroup>
              {' '}
            </Navbar.Form>
          </Navbar.Collapse>
        </div>

      </div>
    );
  }
}

export default Radium(NavBar);
