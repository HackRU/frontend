import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavLink, NavItem, Collapse, NavbarToggler, Button, Container } from 'reactstrap';
import { navlinks, theme } from "./Defaults";
const buttonStyle = {
    border: "1px solid white"
}
class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    getAuthButtons() {
        return (
            <div>
                <Button style={buttonStyle} color="link" href="/login">Login</Button>{' '}
                <Button style={buttonStyle} color="link" href="/signup">Sign Up</Button>
            </div>
        );
    }
    getAuthLinks() {
        return (
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
        for (let i = 0; i < keys.length - 1; i++) {
            navLinks.push(
                <NavItem>
                    <NavLink href={"/" + navlinks[keys[i]].url} onClick={this.toggleIfMobile}>{keys[i].toString()}</NavLink>
                </NavItem>
            );
        }
        return (
            navLinks
        )
    }
    getMobileNavbar() {
        return (
            <div>
                <NavItem>
                    <NavbarBrand onClick={this.toggle} style={{ color: theme.accent[0] }}>HackRU</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            {this.getNavLinks()}
                            {this.getAuthLinks()}
                        </Nav>
                    </Collapse>
                </NavItem>
            </div>
        );
    }
    render() {
        let profile = this.props.profile;
        return (
            <Navbar style={{ width: "100%", zIndex: "20", backgroundColor: theme.secondary[1] }} fixed="top" dark expand="md">
                <Container>
                    <NavbarBrand>
                        <NavbarToggler onClick={this.toggle} style={{ marginRight: 10 }} />
                        <a style={{ color: theme.accent[0] }} href="/#">HackRU</a>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className="mr-auto">
                            {this.getNavLinks()}
                        </Nav>
                        <Nav navbar className="ml-auto">
                            { profile.isLoggedIn ?
                                this.getDashboardButton() :
                                this.getAuthButtons()}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}
export default NavBar;