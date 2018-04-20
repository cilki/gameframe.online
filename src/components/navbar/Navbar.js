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
        {count.toLocaleString()}
      </Tooltip>
    );
  }
  return (
    <LinkContainer to={href} {...linkProps}>
      <NavItem {...navProps}>
        <OverlayTrigger placement="bottom" overlay={tooltip}>
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
    gamesCount: PropTypes.number,
    developersCount: PropTypes.number,
    articlesCount: PropTypes.number,
    gamesCountError: PropTypes.string, //eslint-disable-line
    developersCountError: PropTypes.string, //eslint-disable-line
    articlesCountError: PropTypes.string, //eslint-disable-line
    gamesCountRequested: PropTypes.bool, //eslint-disable-line
    developersCountRequested: PropTypes.bool, //eslint-disable-line
    articlesCountRequested: PropTypes.bool, //eslint-disable-line

    fetchGamesCount: PropTypes.func.isRequired,
    fetchDevelopersCount: PropTypes.func.isRequired,
    fetchArticlesCount: PropTypes.func.isRequired,
  };

  static defaultProps = {
    gamesCount: 0,
    developersCount: 0,
    articlesCount: 0,
    gamesCountError: null,
    developersCountError: null,
    articlesCountError: null,

    gamesCountRequested: false,
    developersCountRequested: false,
    articlesCountRequested: false,

    fetchGamesCount: () => { return (0)},
    fetchDevelopersCount: () => { return (0)},
    fetchArticlesCount: () => { return (0) },
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description - React lifecycle method used to fetch data.
   */
  componentDidMount() {
    this.props.fetchGamesCount();
    this.props.fetchDevelopersCount();
    this.props.fetchArticlesCount();
  }

  render() {
    const pages = [
      {
        href: '/games',
        label: 'Games',
        imageSrc: '../../static/images/ic_videogame_asset_black_48px.svg',
        count: this.props.gamesCount,
      },
      {
        href: '/developers',
        label: 'Developers',
        imageSrc: '../../static/images/ic_business_center_black_48px.svg',
        count: this.props.developersCount,
      },
      {
        href: '/articles',
        label: 'Articles',
        imageSrc: '../../static/images/ic_library_books_black_48px.svg',
        count: this.props.articlesCount,
      },
      {
        href: '/about',
        label: 'About',
        imageSrc: '../../static/images/ic_info_black_48px.svg',
        count: null,
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
