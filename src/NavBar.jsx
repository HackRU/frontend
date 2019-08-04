import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown } from 'reactstrap';
import { defaults, navlinks, theme } from "./Defaults";

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
  render() {
    const dropdownItemStyle = {
      color: theme.accent[0]
    }

    return (
        <Navbar style={{width: "100%",position:"fixed", zIndex: "20", backgroundColor: theme.secondary[1]}} expand="md">
          <NavbarBrand href="/" style={{color: theme.accent[0]}}>HackRU</NavbarBrand>
          <Nav>
            <NavLink href={navlinks["About Us"].url}>About Us</NavLink>
          </Nav>
          <Nav>
            <NavLink href={navlinks.Schedule.url}>Schedule</NavLink>
          </Nav>
          <Nav>
            <NavLink href={navlinks.Sponsors.url}>Sponsors</NavLink>
          </Nav>
          <Nav>
            <NavLink href={navlinks.Partners.url}>Partners</NavLink>
          </Nav>
          <Nav>
            <NavLink href={navlinks.FAQs.url}>FAQs</NavLink>
          </Nav>
          <Nav>
            <NavLink href="/live" style={dropdownItemStyle}>Live</NavLink>
          </Nav>
          <Dropdown onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{backgroundColor: 0}}>
            <DropdownToggle style={{backgroundColor: theme.secondary[1], border:0, outline:0, pointerEvents: "none"}} caret right>
                Get Started!
            </DropdownToggle>
            <DropdownMenu style={{backgroundColor: theme.primary[0]}}>
                <DropdownItem style={dropdownItemStyle} href="/login">Login</DropdownItem>
                <DropdownItem style={dropdownItemStyle} href="/signup">Sign Up</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Navbar>
    );
  }
}
export default NavBar;