/**
 * Navbar that allows navigation within the site.
 */

import React from 'react';
import { Navbar, Nav, Brand, Toggle, NavItem, Forms, FormGroup, 
         FormControl, Button } from 'react-bootstrap';

class NavBar extends React.Component {
	render() {
		return (
			<Navbar inverse collapseOnSelect>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="/">GameFrame.Online</a>
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			    <Nav>
			      <NavItem eventKey={1} href="#">
			        Games
			      </NavItem>
			      <NavItem eventKey={2} href="#">
			        Developers
			      </NavItem>
				  <NavItem eventKey={3} href="#">
			        Articles
			      </NavItem>
				  <NavItem eventKey={4} href="#">
			        About
			      </NavItem>
				</Nav>
				<Navbar.Form pullRight>
				  <FormGroup>
				    <FormControl type="text" placeholder="Search" />
			      </FormGroup>{' '}
			      <Button type="submit">Submit</Button>
				</Navbar.Form>
			  </Navbar.Collapse>
			</Navbar>
		);
	}
}

export default NavBar;