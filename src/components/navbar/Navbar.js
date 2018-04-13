/**
 * Navbar that allows navigation within the site.
 */

import React from 'react';
import Radium from 'radium';
import { Navbar, Nav, NavItem, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import NavbarStyles from './NavbarStyles';
import Search from '../Search';
import PropTypes from 'prop-types';

/**
 * @description - Function that generates a LinkContainer for the Navbar.
 * @param {String} href - the location to redirect.
 * @param {string} imageSrc - icon images for pages.
 * @param {String} label - the text to display to the user.
 * @param {String} count - how many model objects are in this page.
 * @param {Object} linkProps - extra props (such as key) that would need to be
 *  given to the outlying LinkContainer component.
 * @param {Object} navProps - Extra props (such as eventKey) that need to be
 *  placed within the NavItem.
 * @returns {React.Component}
 */
function createLinkContainerNavItem(href, imageSrc, label, count, linkProps, navProps) {
  let tooltip = (<div>{null}</div>);
  if (count != null && count >= 0) {
    tooltip = (
      <Tooltip id={`${label}-tooltip`} key={`${label}-tooltip`}>
        {count}
      </Tooltip>
    );
  }
  return (
    <LinkContainer to={href} {...linkProps}>
      <NavItem {...navProps}>
        <OverlayTrigger placement={"bottom"} overlay={tooltip}>
          <div style={[NavbarStyles.itemMain]} key={`${href}`}>
            <img
              style={NavbarStyles.navImage}
              key={`${href}-image`}
              src={imageSrc}
              alt={label}
            />
            {label}
          </div>
        </OverlayTrigger>
      </NavItem>
    </LinkContainer>
  );
}

class NavBar extends React.Component {   
  static propTypes = {
    games: PropTypes.number,
    developers: PropTypes.number,
    articles: PropTypes.number
  };

  static defaultProps = {
    games: 0,
    developers: 0,
    articles: 0
  };

  /**
   * @constructor
   */
  constructor(props) {
   super(props);
   this.state = {};
  }
  
  render() {
    const pages = [
      {
        href: '/games',
        label: 'Games',
        imageSrc: '../../static/images/ic_videogame_asset_black_48px.svg',
        count: this.props.games
      },
      {
        href: '/developers',
        label: 'Developers',
        imageSrc: '../../static/images/ic_business_center_black_48px.svg',
        count: this.props.developers
      },
      {
        href: '/articles',
        label: 'Articles',
        imageSrc: '../../static/images/ic_library_books_black_48px.svg',
        count: this.props.articles
      },
      {
        href: '/about',
        label: 'About',
        imageSrc: '../../static/images/ic_info_black_48px.svg',
        count: null
      },
    ];

    return (
      <Navbar inverse collapseOnSelect style={NavbarStyles.main}>
        <Navbar.Header>
          <Navbar.Brand>
            <div style={[NavbarStyles.brandContainer]}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <img
                  src="../../static/images/logo_black.svg"
                  alt="GameFrame.Online"
                  style={[NavbarStyles.brandImage]}
                />
              </Link>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft>
            {
              pages.map((page, index) => createLinkContainerNavItem(
                page.href,
                page.imageSrc,
                page.label,
                page.count,
                { key: page.href },
                { eventKey: index },
              ))
            }
          </Nav>
          <Navbar.Form pullRight>
            <Search />
            {' '}
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Radium(NavBar);
