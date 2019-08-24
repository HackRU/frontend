import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavLink, NavItem, Collapse, NavbarToggler, Button, ButtonGroup, Container } from 'reactstrap';
import { navlinks, theme } from "./Defaults";
const buttonStyle = {
    border: "1px solid white"
}
class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleIfMobile = this.toggleIfMobile.bind(this);
        this.handleScroll = this.handleScroll.bind(this);


        this.state = {
            isOpen: false,
            shouldRender: 0
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let badge = document.getElementById("mlh-trust-badge");
        let badgeHeight = parseFloat(window.getComputedStyle(badge).getPropertyValue("height").replace("px", ""));
        let offset = window.pageYOffset;
        
        if (offset < badgeHeight) {
            //At top
            this.setState({
                shouldRender: 0
            });
        } else if (this.state.shouldRender == 0 && offset > badgeHeight) {
            this.setState({
                shouldRender: 1
            })
        }
    }


    toggleIfMobile() {
        if (window.innerWidth < 768) {
            this.setState({
                isOpen: false
            });
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    getAuthButtons() {
        return (
            <div>
                <ButtonGroup>
                    <Button style={buttonStyle} color="link" href="/login">Login</Button>{' '}
                    <Button style={buttonStyle} color="link" href="/signup">Sign Up</Button>
                </ButtonGroup>
            </div>
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

    getLandingNav() {
        return (
        <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="mr-auto">
                {this.getNavLinks()}
            </Nav>
            <Nav navbar className="ml-auto">
                { this.props.profile.isLoggedIn ?
                    this.getDashboardButton() :
                    this.getAuthButtons()}
            </Nav>
        </Collapse>
        );
    }

    getDashboardNav() {
        return (
        <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="mr-auto">
                <NavItem>
                    <NavLink href="/" onClick={this.toggleIfMobile}>Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/live" onClick={this.toggleIfMobile}>Live</NavLink> 
                </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
                <NavItem>
                    <Button style={buttonStyle} color="link" href="/logout">Logout</Button>
                </NavItem>
            </Nav>
        </Collapse>
        );
    }

    render() {
        let path = window.location.pathname;
        return(
            <Navbar id="navbar" style={{ width: "100%", zIndex: "20", backgroundColor: theme.secondary[1], opacity: this.state.shouldRender, transition: "opacity 1.5s" }} fixed="top" dark expand="md">
                <Container>
                        <NavbarBrand>
                            <NavbarToggler onClick={this.toggle} style={{ marginRight: 10 }} />
                            <a style={{ color: theme.accent[0] }} onClick={this.toggleIfMobile} href="/#">HackRU</a>
                        </NavbarBrand>
                       { (path === "/dashboard") ? 
                            this.getDashboardNav() :
                            this.getLandingNav() }
                </Container>
            </Navbar> );
    }
}
export default NavBar;