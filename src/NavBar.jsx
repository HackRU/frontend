import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Container } from 'reactstrap';
import { defaults, navlinks, theme } from "./Defaults";

const dropdownItemStyle = {
  color: theme.accent[0]
}

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.state = {
      dropdownOpen: false
    };

  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onMouseEnter() {
      this.setState({
          dropdownOpen: true
      });
  }

  onMouseLeave() {
      this.setState({
          dropdownOpen: false
      });
  }

  getDropdown() {
    return (
      <Dropdown onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{backgroundColor: 0}}>
        <DropdownToggle style={{backgroundColor: theme.secondary[1], border:0, outline:0, pointerEvents: "none"}} caret right>
          Get Started!
        </DropdownToggle>
        <DropdownMenu style={{backgroundColor: theme.primary[0]}}>
          <DropdownItem style={dropdownItemStyle} href="/login">Login</DropdownItem>
          <DropdownItem style={dropdownItemStyle} href="/signup">Sign Up</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }

  getDashboardButton() {
    return (
      <NavLink href="/dashboard" style={dropdownItemStyle}>Dashboard</NavLink>
    )
  }

  render() {

    let profile = this.props.profile;

    return (
      <Container>
        <Navbar style={{width: "100%", zIndex: "20", backgroundColor: theme.secondary[1]}} fixed="top" expand="md">
          <NavbarBrand href="/#home" style={{color: theme.accent[0]}}>HackRU</NavbarBrand>
          <Nav>
            <NavItem>
              <NavLink href={"/" + navlinks["About Us"].url}>About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/" + navlinks.Schedule.url}>Schedule</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/" + navlinks.Sponsors.url}>Sponsors</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/" + navlinks.Partners.url}>Partners</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/" + navlinks.FAQs.url}>FAQs</NavLink>
            </NavItem>
            <NavLink href="/live" style={dropdownItemStyle}>Live</NavLink>
          </Nav>
          <Nav pullRight className="ml-auto">
            {profile.isLoggedIn ? this.getDashboardButton() : this.getDropdown()}
          </Nav>
        </Navbar>
        <br></br>
      </Container>
    );
  }
}
export default NavBar;