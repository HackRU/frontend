import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  Collapse,
  NavbarToggler,
  Col,
  Row,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container } from 'reactstrap';

import GlowButton from "./components/GlowButton"
import { defaults, navlinks, theme } from "./Defaults";

const buttonStyle = {
  border: "1px solid white"
}

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleIfMobile = this.toggleIfMobile.bind(this);

    this.state = {
      isOpen: false
    };

  }

  componentDidMount() {
    console.log(this.state.isOpen + "  " + this.props.isMobile)
  }

  toggle() {
    if (this.props.isMobile) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  toggleIfMobile() {
    if (this.props.isMobile) {
      this.toggle();
    }
  }
  

  getAuthButtons() {
    if (!this.props.isMobile) {
      return(
        <div>
          <Button style={buttonStyle} color="link" href="/login">Login</Button>{' '}
          <Button style={buttonStyle} color="link" href="/signup">Sign Up</Button>
        </div>
      );
    }
  }

  getAuthLinks() {
    return(
      [<NavLink href="/login" color={theme.accent[1]}>Login</NavLink>,
      <NavLink href="/signup" color={theme.accent[1]}>Sign Up</NavLink>
      ]
    );
  }

  getDashboardButton() {
    return (
      <Button href="/dashboard" color="link" style={buttonStyle}>Dashboard</Button>
    )
  }

  getNavLinks() {
    
    let keys = Object.keys(navlinks);
    let navLinks = [];
    for (let i = 0; i < keys.length; i++) {
      navLinks.push(
        <NavItem>
          <NavLink href={"/" + navlinks[keys[i]].url} onClick={this.toggleIfMobile}>{keys[i].toString()}</NavLink>
        </NavItem>
      );
    }

    return(
      navLinks
    )
  }

  getMobileNavbar() {
    return(
      <Container>
        <NavItem>
        <NavbarBrand onClick={this.toggle} style={{color:theme.accent[0]}}>HackRU</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              {this.getNavLinks()}
              {this.getAuthLinks()}
            </Nav>
          </Collapse>
        </NavItem>
      </Container>
      // [
      // <NavItem>
      //   <NavbarToggler onClick={this.toggle}/>
      //   <Collapse isOpen={this.state.isOpen} navbar>
      //     <Nav navbar>
      //       {this.getNavLinks()}
      //       {this.getAuthLinks()}
      //     </Nav>
      //   </Collapse>
      // </NavItem>
      //   ,
      // <NavbarBrand href="/#" className="text-center" style={{color:theme.accent[0]}}>HackRU</NavbarBrand>
      // ]
    );
  }

  getNavbar() {
    return(
      [
      <NavbarBrand href="/#" style={{color:theme.accent[0]}}>HackRU</NavbarBrand>,
      this.getNavLinks()
      ]
    )
  }

  render() {

    let profile = this.props.profile;
    let isMobile = this.props.isMobile;

    return (
      <div>
        <Navbar style={{width: "100%", zIndex: "20", backgroundColor: theme.secondary[1]}} fixed="top" dark expand="md">
          <Container>
            <Nav>
              {isMobile ? this.getMobileNavbar() : this.getNavbar() }
            </Nav>
            <div pullRight className="ml-auto">
              {profile.isLoggedIn ? this.getDashboardButton() : this.getAuthButtons()}
            </div>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;